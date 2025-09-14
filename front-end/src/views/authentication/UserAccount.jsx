import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import AuthUpdate from "./auth/AuthUpdate";

const userValidationSchema = yup.object({
  name: yup.string().min(2).max(25).required("Please enter your name"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
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

const UserAccount = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const initialUserValues = {
    name: userInfo.name || "",
    email: userInfo.email || "",
    password: userInfo.password || "",
    confirm_password: "",
    role: userInfo.role || "student",
  };

  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async ({ name, email, password, confirm_password, role }) => {
    if (password !== confirm_password) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          role,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      {/* Animated background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-indigo-100 to-blue-100">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#d2f1df,#d3d7fa,#bad8f4)] bg-[length:400%_400%] animate-gradient opacity-40" />

        {/* Center Card */}
        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
              Update Account Info
            </h2>

            <AuthUpdate formik={formik} onSubmit={formik.handleSubmit} />
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
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </>
  );
};

export default UserAccount;
