import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLogin from "./auth/AuthLogin.jsx";
import { useFormik } from "formik";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "./../../slices/usersApiSlice";
import { setCredentials } from "./../../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

// ✅ Validation Schema
const userValidationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const initialUserValues = { email: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await login(values).unwrap();
        dispatch(setCredentials({ ...res }));
        formik.resetForm();

        const redirectLocation = JSON.parse(localStorage.getItem("redirectLocation"));
        if (redirectLocation) {
          localStorage.removeItem("redirectLocation");
          navigate(redirectLocation.pathname);
        } else {
          navigate("/");
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  return (
    <>
      {/* Background with animated gradient and blobs */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#d2f1df,#d3d7fa,#bad8f4,#e3defa)] bg-[length:300%_300%] animate-gradient opacity-40" />

        {/* Floating blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Centered Card */}
        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 p-8">
            {/* Logo / Heading */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                ExamGuardian
              </h1>
              <p className="text-gray-500 mt-2">Sign in to continue</p>
            </div>

            {/* Auth Form */}
            <AuthLogin
              formik={formik}
              subtext={
                <p className="text-center text-gray-600 font-medium mb-2">
                  Secure online exam & interview monitoring
                </p>
              }
              subtitle={
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <span className="text-gray-600">New to ExamGuardian?</span>
                  <Link
                    to="/auth/register"
                    className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition-colors"
                  >
                    Create an account
                  </Link>
                </div>
              }
            />

            {/* Loader */}
            {isLoading && <Loader />}
          </div>
        </div>
      </div>

      {/* Tailwind animations */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 12s ease infinite;
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </>
  );
};

export default Login;
