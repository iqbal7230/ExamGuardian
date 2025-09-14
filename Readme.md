# 🛡️ ExamGuardian  
**AI-powered Video Proctoring System for Secure Online Interviews & Exams**

---

## 📌 Overview
ExamGuardian is an intelligent **online proctoring system** that uses **Computer Vision & Machine Learning** to ensure exam integrity.  
It monitors candidates in real-time through their webcam to detect:  

✅ Focus loss (looking away, face missing, multiple faces)  
✅ Suspicious items (mobile phone, books, notes, extra devices)  
✅ Event logging with timestamps  
✅ Auto-generated Proctoring Report (CSV/PDF)  

---

## 🎯 Features
- 🎥 **Live Video Feed** – Candidate video streaming & recording  
- 🧑‍💻 **Focus Detection** – Alerts if user is distracted, absent, or multiple faces appear  
- 📱 **Object Detection** – Identifies phones, books, laptops, etc. using TensorFlow.js (COCO-SSD)  
- 📝 **Event Logging** – Suspicious activities logged with timestamps  
- 📊 **Proctoring Report** – Generates downloadable CSV reports for interview/exam sessions  
- 🌐 **Frontend Built with React + Vite + TailwindCSS + Material UI**  

---

## 🛠️ Tech Stack
**Frontend**  
- [React](https://react.dev/) (Vite bundler)  
- [Tailwind CSS](https://tailwindcss.com/) for theming  
- [Material UI](https://mui.com/) for components  
- [TensorFlow.js](https://www.tensorflow.org/js) – Object detection (COCO-SSD model)  
- [Formik + Yup](https://formik.org/) – Form handling & validation  

**Backend (optional)**  
- [Node.js + Express](https://expressjs.com/) – For storing logs & reports  
- [MongoDB](https://www.mongodb.com/) – Candidate & activity data storage  

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/ExamGuardian.git
cd ExamGuardian
cd backend 
npm install
npm start
cd frontend 
npm run dev

## How It Works

- Login/Register into the system
- Start Interview/Exam → Candidate’s camera is activated
- Focus Detection → Logs if face missing, looking away, or multiple faces
- Object Detection → Uses AI model to detect phones, books, extra devices
- Real-time Logging → Events recorded in panel with timestamps
- Report Generation → Export logs as PDF