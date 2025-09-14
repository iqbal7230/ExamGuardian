import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthRegister from "./auth/AuthRegister";
import { useFormik } from "formik";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "./../../slices/usersApiSlice";
import { setCredentials } from "./../../slices/authSlice";
import Loader from "./Loader";

const userValidationSchema = yup.object({
  name: yup.string().min(2).max(25).required("Please enter your name"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Password must match"),
  role: yup
    .string()
    .oneOf(["student", "teacher"], "Invalid role")
    .required("Role is required"),
});

const initialUserValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  role: "student",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: async ({ name, email, password, confirm_password, role }) => {
      if (password !== confirm_password) {
        toast.error("Passwords do not match");
        return;
      }
      try {
        const res = await register({ name, email, password, role }).unwrap();
        dispatch(setCredentials({ ...res }));
        formik.resetForm();
        navigate("/auth/login");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    },
  });

  return (
    <>
      {/* Background with animated gradient */}
     <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#d2f1df,#d3d7fa,#bad8f4,#e3defa)] bg-[length:300%_300%] animate-gradient opacity-40" />

        {/* Centered Card */}
        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
            {/* Logo / Heading */}
            <div className="text-center mb-6">
             <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                ExamGuardian
              </h1>
             
            </div>

            {/* Auth Form */}
            <AuthRegister
              formik={formik}
              onSubmit={formik.handleSubmit}
              subtext={
                <p className="text-center text-gray-600 font-medium uppercase mb-2">
                  Secure online exam & interview monitoring
                </p>
              }
              subtitle={
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <span className="text-gray-600">Already have an account?</span>
                  <Link
                    to="/auth/login"
                    className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition-colors"
                  >
                    Sign In
                  </Link>
                  {isLoading && <Loader />}
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Tailwind gradient animation */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 12s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Register;
