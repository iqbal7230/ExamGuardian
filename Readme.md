# 🛡️ ExamGuardian

**AI-powered Video Proctoring System for Secure Online Interviews & Exams**

---

## 📌 Overview

ExamGuardian is an intelligent **online proctoring system** that leverages **Computer Vision & Machine Learning** to ensure exam integrity during remote assessments. The system monitors candidates in real-time through their webcam, providing comprehensive surveillance and detailed reporting for secure online interviews and examinations.

### Key Capabilities
- **🎯 Focus Detection** – Alerts when candidates look away, face is missing, or multiple faces appear
- **📱 Object Detection** – Identifies suspicious items (mobile phones, books, notes, extra devices)
- **📝 Real-time Logging** – Event logging with precise timestamps
- **📊 Automated Reporting** – Generates downloadable PDF proctoring reports

---

## ✨ Features

### 🎥 Live Monitoring
- **Real-time Video Feed** – Continuous candidate video streaming and recording
- **Advanced Face Detection** – Multi-face recognition and absence detection
- **Behavioral Analysis** – Tracks attention patterns and suspicious movements

### 🔍 AI-Powered Detection
- **Object Recognition** – Identifies phones, books, laptops, and other prohibited items using TensorFlow.js COCO-SSD model
- **Focus Tracking** – Monitors candidate attention and engagement levels
- **Anomaly Detection** – Flags unusual behavior patterns automatically


---

## 🛠️ Tech Stack

### Frontend
- **[React](https://react.dev/)** (18.0+) with Vite bundler
- **[Tailwind CSS](https://tailwindcss.com/)** for styling and theming
- **[Material UI](https://mui.com/)** for component library
- **[TensorFlow.js](https://www.tensorflow.org/js)** for object detection (COCO-SSD model)
- **[Formik + Yup](https://formik.org/)** for form handling and validation

### Backend 
- **[Node.js + Express](https://expressjs.com/)** for API and data management
- **[MongoDB](https://www.mongodb.com/)** for candidate and activity data storage


---

## 🚀 Getting Started

### Prerequisites

Before running ExamGuardian, ensure you have the following installed:
- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** with webcam access

### Installation

1. **Clone the repository**

# 🚀 Project Setup Guide

# 1️⃣ Setup Backend
cd backend
npm install
npm start

# 2️⃣ Setup Frontend
cd frontend
npm install
npm run dev


4. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - Allow webcam permissions when prompted
   - Run backend on another port `http://localhost:3000`

### Environment Variables

Create a `.env` file in the frontend and backend directory 
---

## 📖 Usage

### Starting a Proctoring Session

1. **Login/Register** into the ExamGuardian system
2. **Create Session** – Set up a new interview/exam session
3. **Camera Activation** – Candidate's webcam feed activates automatically
4. **Real-time Monitoring** begins with AI-powered detection

### Monitoring Features

- **📹 Live Video Feed** – Continuous visual monitoring
- **🚨 Instant Alerts** – Real-time notifications for suspicious activities
- **📊 Activity Dashboard** – Live logs panel with timestamped events
- **📁 Session Recording** – Optional video recording for review

### Generating Reports

After session completion:
1. Navigate to the **Reports** section
2. Select the session you want to analyze
3. Click **Generate Report** to create PDF/CSV export
4. Download and share with relevant stakeholders

---

## 🎯 How It Works

### Detection Pipeline

1. **🎥 Video Stream Processing**
   - Captures real-time video from candidate's webcam
   - Processes frames using browser-based Computer Vision

2. **🧠 AI Analysis**
   - **Face Detection**: Monitors presence, absence, and multiple faces
   - **Object Detection**: Uses TensorFlow.js COCO-SSD to identify prohibited items
   - **Focus Analysis**: Tracks eye movement and head positioning

3. **📝 Event Logging**
   - Logs all suspicious activities with precise timestamps
   - Categorizes events by severity and type
   - Stores data locally or sends to backend API

4. **📊 Report Generation**
   - Compiles session data into comprehensive reports
   - Exports in multiple formats (PDF, CSV)
   - Includes visual charts and detailed analytics

---

## 🔮 Future Enhancements

### Planned Features
- **🔔 Real-time Proctor Alerts** – Instant notifications to interview administrators
- **👁️ Eye Tracking** – Advanced drowsiness and attention detection
- **🎙️ Audio Analysis** – Background noise and voice detection
- **🌙 Dark Mode** – Enhanced UI with TailwindCSS dark theme
- **📡 WebSocket Integration** – Real-time bidirectional communication
- **🤖 Advanced AI Models** – Enhanced detection accuracy with custom trained models

### Roadmap
- **Q1 2025**: Eye tracking and drowsiness detection
- **Q2 2025**: Audio analysis and voice recognition
- **Q3 2025**: Mobile app compatibility
- **Q4 2025**: Advanced analytics and machine learning insights

---

</div>


