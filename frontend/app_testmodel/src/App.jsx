import { useState } from "react";
import { Zap, Image as ImageIcon, Brain, History } from "lucide-react";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [modelFile, setModelFile] = useState(null);
  const [activeModelName, setActiveModelName] = useState(null);
  const [currentModelId, setCurrentModelId] = useState(null);
  const [testFile, setTestFile] = useState(null);
  const [testFilePreview, setTestFilePreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [isUploadingModel, setIsUploadingModel] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [classNames, setClassNames] = useState([]);
  const [modelFormat, setModelFormat] = useState(null);
  const [modelHistory, setModelHistory] = useState([]);
  const [modelApiBase, setModelApiBase] = useState(null);

  const VITE_YOLO_API = import.meta.env.VITE_YOLO_API;
  const VITE_KERAS_API = import.meta.env.VITE_KERAS_API;
  const CLOUD_API = import.meta.env.VITE_API_BASE;

  const getApiBase = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    // Render / cloud: ใช้ URL แยกของแต่ละ backend ถ้ามี
    if (["pt", "onnx"].includes(ext) && VITE_YOLO_API) return VITE_YOLO_API;
    if (["h5", "keras"].includes(ext) && VITE_KERAS_API) return VITE_KERAS_API;
    // VITE_API_BASE ตัวเดียว (ใช้เมื่อมี backend เดียว เช่น YOLO อย่างเดียว)
    if (CLOUD_API && CLOUD_API !== "/api") return CLOUD_API;
    // Docker/nginx: ใช้ path ตามนามสกุล
    if (["pt", "onnx"].includes(ext)) return "/api/yolo";
    if (["h5", "keras"].includes(ext)) return "/api/keras";
    return null;
  };

  const handleModelFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModelFile(file);
      const base = getApiBase(file.name);
      setModelApiBase(base);
    }
  };

  const handleModelUpload = async () => {
    if (!modelFile || !modelApiBase) return;
    setIsUploadingModel(true);

    Swal.fire({
      title: "กำลังอัปโหลดโมเดล...",
      text: "ระบบกำลังส่งไฟล์ไปที่ Server โปรดรอสักครู่",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("file", modelFile);

    try {
      const res = await fetch(`${modelApiBase}/upload-model`, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let data = {};
      if (text) {
        try { data = JSON.parse(text); } catch { throw new Error("เซิร์ฟเวอร์ส่งข้อมูลผิดรูปแบบ (Backend อาจกำลังโหลดหรือ busy) ลองใหม่อีกครั้ง"); }
      }
      if (!res.ok) {
        const msg = data.detail || data.message ||
          (res.status === 502 ? "Backend ยังไม่พร้อม ลองใหม่อีกครั้ง" : res.status === 504 ? "หมดเวลา โมเดลใหญ่มากหรือเซิร์ฟเวอร์ busy" : `อัปโหลดไม่สำเร็จ (${res.status})`);
        throw new Error(msg);
      }

      const detectedFormat = data.model_format || modelFile.name.split('.').pop();

      setCurrentModelId(data.model_id);
      setClassNames(data.class_names || []);
      setModelFormat(detectedFormat);
      setActiveModelName(modelFile.name);

      setModelHistory((prev) => [
        {
          model_id: data.model_id,
          name: modelFile.name,
          format: detectedFormat,
          class_names: data.class_names || [],
          apiBase: modelApiBase,
        },
        ...prev,
      ]);

      setResultImage(null);
      setDetections([]);
      
      Swal.fire({
        icon: "success",
        title: "โหลดโมเดลสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "อัปโหลดไม่สำเร็จ",
        text: err.message,
      });
    } finally {
      setIsUploadingModel(false);
    }
  };

  const switchModel = (model) => {
    setCurrentModelId(model.model_id);
    setClassNames(model.class_names || []);
    setModelFormat(model.format);
    setActiveModelName(model.name);
    setModelApiBase(model.apiBase);
    setResultImage(null);
    setDetections([]);
  };

  const handlePredict = async () => {
    if (!testFile || !currentModelId || !modelApiBase) return;
    setIsPredicting(true);

    let timerInterval;
    Swal.fire({
      title: "กำลังประมวลผล...",
      html: "โมเดลกำลังวิเคราะห์ภาพ คาดว่าจะเสร็จใน <b></b> วินาที",
      timer: 15000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          const timeLeft = Swal.getTimerLeft();
          if (timeLeft) {
            b.textContent = (timeLeft / 1000).toFixed(0);
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    const formData = new FormData();
    formData.append("file", testFile);
    formData.append("model_id", currentModelId);

    try {
      const res = await fetch(`${modelApiBase}/predict`, {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      let data = {};
      if (text) {
        try { data = JSON.parse(text); } catch { throw new Error("เซิร์ฟเวอร์ส่งข้อมูลผิดรูปแบบ ลองใหม่อีกครั้ง"); }
      }
      if (!res.ok) {
        const msg = data.detail || data.message ||
          (res.status === 502 ? "Backend ยังไม่พร้อม" : res.status === 504 ? "หมดเวลา" : "Inference failed");
        throw new Error(msg);
      }

      setResultImage(`data:image/jpeg;base64,${data.image}`);
      setDetections(data.detections || []);
      Swal.close();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ตรวจจับไม่สำเร็จ",
        text: "ระบบอาจกำลังเริ่มต้นใหม่ โปรดรอ 1 นาทีแล้วลองอีกครั้ง",
      });
      setResultImage(testFilePreview);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleTestFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setTestFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setTestFilePreview(reader.result);
      setResultImage(null);
      setDetections([]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="inner"><h1>Model Tester</h1></div>
      </div>

      <div className="main-content">
        <div>
          <h2 className="font-light mb-8 text-gray-300">Upload & Run</h2>
          <div className="mb-8">
            <label>
              <input type="file" accept=".pt,.onnx,.pth,.h5,.keras" className="hidden" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const api = getApiBase(file.name);
                  if (!api) {
                    Swal.fire("ข้อผิดพลาด", "ไม่รองรับไฟล์ประเภทนี้", "warning");
                    return;
                  }

                  setModelFile(file);
                  setActiveModelName(file.name);
                  setModelApiBase(api); 
                  setCurrentModelId(null);
                }} 
              />
              <div className="upload-box">
                <Brain className="w-10 h-10 text-blue-500" />
                <span className="upload-text">{activeModelName || "Upload Model "}</span>
              </div>
            </label>
            {modelFile && !currentModelId && (
              <button onClick={handleModelUpload} disabled={isUploadingModel} className="action-btn w-full mt-4">
                {isUploadingModel ? "Uploading Model" : "Upload Model to Server"}
              </button>
            )}
            {currentModelId && (
              <div className="text-green-400 text-sm mt-2 text-center">Model Ready to Use ({modelFormat?.toUpperCase()})</div>
            )}
          </div>

          <div className="mb-8">
            <label>
              <input type="file" accept="image/*" className="hidden" onChange={handleTestFileChange} />
              <div className="upload-box">
                <ImageIcon className="w-10 h-10 text-green-500" />
                <span className="upload-text">{testFile ? testFile.name : "Upload Test Image"}</span>
              </div>
            </label>
          </div>

          <button onClick={handlePredict} disabled={isPredicting || !testFile || !currentModelId} className="action-btn w-full">
            <Zap className="w-10 h-10" />
            {isPredicting ? "Analyzing" : "Run Inference"}
          </button>

          {modelHistory.length > 0 && (
            <div className="stats-card mt-6">
              <div className="stats-title flex items-center gap-2"><History size={16} /> Model History</div>
              {modelHistory.map((m) => (
                <div key={m.model_id} className={`stat-item cursor-pointer ${currentModelId === m.model_id ? "active-model" : ""}`} onClick={() => switchModel(m)}>
                  <span className="text-gray-200 text-sm truncate">{m.name}</span>
                  <span className="text-cyan-400 text-xs">{m.format?.toUpperCase()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="result-zone">
          <h3>Inference Results</h3>
          {(testFilePreview || resultImage) ? (
            <>
              <div className="result-images">
                {testFilePreview && (
                  <div className="result-card">
                    <div className="result-label">Input</div>
                    <img src={testFilePreview} alt="Input" />
                  </div>
                )}
                {resultImage && (
                  <div className="result-card">
                    <div className="result-label">Output</div>
                    <img src={resultImage} alt="Output" />
                  </div>
                )}
              </div>

              {detections.length > 0 && (
                <div className="stats-card">
                  <div className="stats-title">Detection Summary</div>
                  {(() => {
                    const total = detections.length;
                    const summary = detections.reduce((acc, d) => {
                      const name = classNames[d.cls] || `Class ${d.cls}`;
                      acc[name] = (acc[name] || 0) + 1;
                      return acc;
                    }, {});

                    return Object.entries(summary)
                      .sort(([, a], [, b]) => b - a)
                      .map(([name, count]) => {
                        const percentage = ((count / total) * 100).toFixed(2);
                        return (
                          <div key={name} className="stat-item">
                            <span className="class-name text-gray-200">{name}</span>
                            <span className="text-cyan-400 font-medium">{count} objects · {percentage}%</span>
                          </div>
                        );
                      });
                  })()}

                  <div className="mt-4">
                    <div className="stat-item-no-border">
                      <span className="text-gray-400 text-sm">Total Detections</span>
                      <span className="text-xl font-bold text-white">{detections.length}</span>
                    </div>
                    <div className="stat-item-no-border">
                      <span className="text-gray-400 text-sm">Model Avg Confidence</span>
                      <span className="text-xl font-bold text-cyan-400">
                        {detections.length > 0 
                          ? ((detections.reduce((sum, d) => sum + (d.conf || 0), 0) / detections.length) * 100).toFixed(1)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <Brain className="w-24 h-24 mx-auto mb-4 opacity-20" />
              <p>อัปโหลดโมเดลและภาพเพื่อเริ่มใช้งาน</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;