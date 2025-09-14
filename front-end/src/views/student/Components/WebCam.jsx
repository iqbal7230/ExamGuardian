import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";
import swal from "sweetalert";
import { UploadClient } from "@uploadcare/upload-client";

const client = new UploadClient({ publicKey: "e69ab6e5db6d4a41760b" });

export default function Home({ cheatingLog, updateCheatingLog }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [lastDetectionTime, setLastDetectionTime] = useState({});
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    if (cheatingLog?.screenshots) setScreenshots(cheatingLog.screenshots);
  }, [cheatingLog]);

  const captureScreenshotAndUpload = async (type) => {
    const video = webcamRef.current?.video;
    if (!video || video.readyState !== 4 || video.videoWidth === 0) return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    const file = dataURLtoFile(dataUrl, `cheating_${Date.now()}.jpg`);

    try {
      const result = await client.uploadFile(file);
      const screenshot = { url: result.cdnUrl, type, detectedAt: new Date() };
      setScreenshots((prev) => [...prev, screenshot]);
      return screenshot;
    } catch (err) {
      console.error("Upload failed:", err);
      return null;
    }
  };

  const handleDetection = async (type) => {
    const now = Date.now();
    if (now - (lastDetectionTime[type] || 0) < 3000) return;

    setLastDetectionTime((prev) => ({ ...prev, [type]: now }));
    const screenshot = await captureScreenshotAndUpload(type);

    if (screenshot) {
      const updatedLog = {
        ...cheatingLog,
        [`${type}Count`]: (cheatingLog[`${type}Count`] || 0) + 1,
        screenshots: [...(cheatingLog.screenshots || []), screenshot],
      };
      updateCheatingLog(updatedLog);
    }

    const messages = {
      noFace: "Face Not Visible",
      multipleFace: "Multiple Faces Detected",
      cellPhone: "Cell Phone Detected",
      prohibitedObject: "Prohibited Object Detected",
    };
    if (messages[type]) swal(messages[type], "Warning Recorded", "warning");
  };

  const runCoco = async () => {
    try {
      const net = await cocossd.load();
      console.log("AI model loaded.");
      setInterval(() => detect(net), 1000);
    } catch (err) {
      console.error(err);
      swal("Error", "Failed to load AI model. Please refresh the page.", "error");
    }
  };

  const detect = async (net) => {
    const video = webcamRef.current?.video;
    if (!video || video.readyState !== 4) return;

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = video.videoWidth;
    canvasRef.current.height = video.videoHeight;

    try {
      const objects = await net.detect(video);
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawRect(objects, ctx);

      let person_count = 0;
      let faceDetected = false;

      objects.forEach((obj) => {
        const cls = obj.class;
        if (cls === "cell phone") handleDetection("cellPhone");
        if (cls === "book" || cls === "laptop") handleDetection("prohibitedObject");
        if (cls === "person") {
          faceDetected = true;
          person_count++;
          if (person_count > 1) handleDetection("multipleFace");
        }
      });

      if (!faceDetected) handleDetection("noFace");
    } catch (err) {
      console.error("Detection error:", err);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen">
      <Webcam
        ref={webcamRef}
        audio={false}
        muted
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        className="w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-10"
      />
    </div>
  );
}

// Helper function
function dataURLtoFile(dataUrl, fileName) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}
