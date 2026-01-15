import React, { useState, useEffect } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
  const interceptor = axios.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      const file = config.data.get("photo");

      if (file) {
        const MAX_SIZE =  1024 ;
        const ALLOWED = ["image/jpeg", "image/png"];

        if (file.size > MAX_SIZE) {
          const error = new Error("File too large");
          error.code = "FILE_TOO_LARGE";
          throw error;
        }

        if (!ALLOWED.includes(file.type)) {
          const error = new Error("Invalid file type");
          error.code = "INVALID_FILE_TYPE";
          throw error;
        }
      }
    }
    return config;
  });

  return () => axios.interceptors.request.eject(interceptor);
}, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("photo", file);

    try {
      setError("");

      const response = await axios.post("http://localhost:3000/upload", formData, {
        timeout: 30000,
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        }
      });

      console.log("Upload success:", response.data);
   } catch (err) {
  if (err.code === "FILE_TOO_LARGE") {
    setError("File too large");
  } else if (err.code === "INVALID_FILE_TYPE") {
    setError("Unsupported file type");
  } else if (!err.response) {
    setError("Network error or CORS blocked");
  } else if (err.code === "ECONNABORTED") {
    setError("Upload timeout");
  } else if (err.response.status === 413) {
    setError("File too large");
  } else if (err.response.status === 415) {
    setError("Unsupported file type");
  } else if (err.response.status >= 500) {
    setError("Server error");
  } else {
    setError("Upload failed: " + err.response.data.error);
  }
}

  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>

      <div>Progress: {progress}%</div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Upload;
