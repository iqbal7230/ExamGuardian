# 🛡️ ExamGuardian

**AI-powered Video Proctoring System for Secure Online Interviews & Exams**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Overview

ExamGuardian is an intelligent **online proctoring system** that leverages **Computer Vision & Machine Learning** to ensure exam integrity during remote assessments. The system monitors candidates in real-time through their webcam, providing comprehensive surveillance and detailed reporting for secure online interviews and examinations.

### Key Capabilities
- **🎯 Focus Detection** – Alerts when candidates look away, face is missing, or multiple faces appear
- **📱 Object Detection** – Identifies suspicious items (mobile phones, books, notes, extra devices)
- **📝 Real-time Logging** – Event logging with precise timestamps
- **📊 Automated Reporting** – Generates downloadable CSV/PDF proctoring reports

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

### 📋 Comprehensive Reporting
- **Event Logging** – Detailed timestamps for all suspicious activities
- **Export Options** – Download reports in CSV/PDF formats
- **Session Analytics** – Complete overview of exam/interview session integrity

### 🎨 Modern UI/UX
- **Responsive Design** – Built with React, Vite, and Tailwind CSS
- **Material UI Components** – Professional and accessible interface
- **Real-time Dashboard** – Live monitoring panel with instant alerts

---

## 🛠️ Tech Stack

### Frontend
- **[React](https://react.dev/)** (18.0+) with Vite bundler
- **[Tailwind CSS](https://tailwindcss.com/)** for styling and theming
- **[Material UI](https://mui.com/)** for component library
- **[TensorFlow.js](https://www.tensorflow.org/js)** for object detection (COCO-SSD model)
- **[Formik + Yup](https://formik.org/)** for form handling and validation

### Backend (Optional)
- **[Node.js + Express](https://expressjs.com/)** for API and data management
- **[MongoDB](https://www.mongodb.com/)** for candidate and activity data storage

### AI/ML
- **TensorFlow.js COCO-SSD** for real-time object detection
- **Browser-based Computer Vision** for face and focus detection

---

## 🚀 Getting Started

### Prerequisites

Before running ExamGuardian, ensure you have the following installed:
- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** with webcam access

### Installation

1. **Clone the repository**

2. **Setup Backend**
``cd backend
npm install
npm start ``


3. **Setup Frontend**
``cd frontend
npm install
npm run dev``


4. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - Allow webcam permissions when prompted

### Environment Variables

Create a `.env` file in the frontend directory:


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


