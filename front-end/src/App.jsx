import React from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheatingLogProvider } from "./context/CheatingLogContext";

/* ***Layouts**** */
import BlankLayout from "./layouts/blank/BlankLayout.jsx";
import FullLayout from "./layouts/full/FullLayout.jsx";
import ExamLayout from "./layouts/full/ExamLayout.jsx";

/* ****Pages***** */
import Success from "./views/Success.jsx";
import LandingPage from "./views/LandingPage.jsx";

// Student Routes
import TestPage from "./views/student/TestPage.jsx";
import ExamPage from "./views/student/ExamPage.jsx";
import ExamDetails from "./views/student/ExamDetails.jsx";
import CodeDetails from "./views/student/CodeDetails.jsx";
import ResultPage from "./views/student/ResultPage.jsx";
import Coder from "./views/student/Coder.jsx";

// Auth Routes
import Error from "./views/authentication/Error.jsx";
import Register from "./views/authentication/Register.jsx";
import Login from "./views/authentication/Login.jsx";
import UserAccount from "./views/authentication/UserAccount.jsx";

// Teacher Routes
import CreateExamPage from "./views/teacher/CreateExamPage.jsx";
import ExamLogPage from "./views/teacher/ExamLogPage.jsx";
import AddQuestions from "./views/teacher/AddQuestions.jsx";
import PrivateRoute from "./views/authentication/PrivateRoute.jsx";
import TeacherRoute from "./views/authentication/TeacherRoute.jsx";

/* Router Setup */
const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Authentication Routes - Public */}
      <Route path="/auth" element={<BlankLayout />}>
        <Route path="404" element={<Error />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Private Routes - Require Authentication */}
      <Route path="" element={<PrivateRoute />}>
        {/* Main App Layout */}
        <Route path="" element={<FullLayout />}>
          <Route path="dashboard" element={<ExamPage />} />
          <Route path="success" element={<Success />} />
          <Route path="exam" element={<ExamPage />} />
          <Route path="result" element={<ResultPage />} />
          
          {/* Teacher Only Routes */}
          <Route path="" element={<TeacherRoute />}>
            <Route path="create-exam" element={<CreateExamPage />} />
            <Route path="add-questions" element={<AddQuestions />} />
            <Route path="exam-log" element={<ExamLogPage />} />
          </Route>
        </Route>

        {/* Exam Taking Layout */}
        <Route path="" element={<ExamLayout />}>
          <Route path="exam/:examId" element={<ExamDetails />} />
          <Route path="exam/:examId/codedetails" element={<CodeDetails />} />
          <Route path="exam/:examId/:testId" element={<TestPage />} />
          <Route path="exam/:examId/code" element={<Coder />} />
        </Route>
      </Route>

      {/* User Account Routes */}
      <Route path="/user" element={<FullLayout />}>
        <Route path="account" element={<UserAccount />} />
      </Route>

      {/* Catch-all redirect to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

function App() {
  return (
    <Provider store={store}>
      <CheatingLogProvider>
        <ToastContainer />
        <CssBaseline />
        <RouterProvider router={Router} />
      </CheatingLogProvider>
    </Provider>
  );
}

export default App;
