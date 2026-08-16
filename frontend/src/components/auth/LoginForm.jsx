import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import GoogleButton from "./GoogleButton";
import api from "../../api";


function LoginForm() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Student");
  const [loginError, setLoginError] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // =====================================================
  // LOGIN
  // =====================================================

  const onSubmit = async (data) => {

    try {

      setLoading(true);
      setLoginError("");


      // -------------------------------------------------
      // Send login request to backend
      // -------------------------------------------------

      const response = await api.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
          role: selectedRole,
        }
      );


      // -------------------------------------------------
      // Save authentication token
      // -------------------------------------------------

      localStorage.setItem(
        "token",
        response.data.access_token
      );


      // -------------------------------------------------
      // Save user information
      // -------------------------------------------------

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      // -------------------------------------------------
      // Role-based redirect
      // -------------------------------------------------

      if (response.data.user.role === "Admin") {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );


      setLoginError(
        error.response?.data?.detail ||
        "Login failed. Please check your credentials."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // ROLE CHANGE
  // =====================================================

  const handleRoleChange = (role) => {

    setSelectedRole(role);
    setLoginError("");

  };


  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* =================================================
          PAGE ROLE SELECTOR
      ================================================= */}

      <div>

        <label className="block mb-2 text-sm font-medium text-slate-200">
          Login As
        </label>


        <div className="grid grid-cols-2 gap-3">

          {/* =================================================
              STUDENT
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleRoleChange("Student")
            }
            className={`
              flex items-center justify-center gap-2
              rounded-xl
              border
              px-4
              py-3
              text-sm
              font-semibold
              transition-all
              duration-200
              ${
                selectedRole === "Student"
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10"
                  : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
              }
            `}
          >

            <UserRound size={18} />

            Student

          </button>


          {/* =================================================
              ADMIN
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleRoleChange("Admin")
            }
            className={`
              flex items-center justify-center gap-2
              rounded-xl
              border
              px-4
              py-3
              text-sm
              font-semibold
              transition-all
              duration-200
              ${
                selectedRole === "Admin"
                  ? "border-purple-400 bg-purple-400/10 text-purple-300 shadow-lg shadow-purple-500/10"
                  : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
              }
            `}
          >

            <ShieldCheck size={18} />

            Admin

          </button>

        </div>

      </div>


      {/* =================================================
          EMAIL
      ================================================= */}

      <div>

        <label
          htmlFor="email"
          className="block mb-2 text-sm text-slate-200"
        >
          Email Address
        </label>


        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"

          {...register("email", {

            required: "Email is required",

            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message:
                "Invalid Email Address",
            },

          })}

          className={`
            w-full
            rounded-xl
            bg-slate-800/80
            border
            px-4
            py-3
            text-white
            outline-none
            transition
            ${
              errors.email
                ? "border-red-500"
                : "border-slate-700 focus:border-cyan-400"
            }
          `}
        />


        {errors.email && (

          <p className="mt-1 text-sm text-red-400">
            {errors.email.message}
          </p>

        )}

      </div>


      {/* =================================================
          PASSWORD
      ================================================= */}

      <div>

        <label
          htmlFor="password"
          className="block mb-2 text-sm text-slate-200"
        >
          Password
        </label>


        <div className="relative">

          <input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="current-password"
            placeholder="Enter password"

            {...register("password", {

              required:
                "Password is required",

            })}

            className={`
              w-full
              rounded-xl
              bg-slate-800/80
              border
              px-4
              py-3
              pr-12
              text-white
              outline-none
              transition
              ${
                errors.password
                  ? "border-red-500"
                  : "border-slate-700 focus:border-cyan-400"
              }
            `}
          />


          {/* Password visibility */}

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-white
              transition
            "
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >

            {showPassword ? (

              <EyeOff size={20} />

            ) : (

              <Eye size={20} />

            )}

          </button>

        </div>


        {errors.password && (

          <p className="mt-1 text-sm text-red-400">
            {errors.password.message}
          </p>

        )}

      </div>


      {/* =================================================
          REMEMBER ME + FORGOT PASSWORD
      ================================================= */}

      <div className="flex items-center justify-between gap-3">

        <label
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-400
            cursor-pointer
          "
        >

          <input
            type="checkbox"
            {...register("remember")}
            className="accent-cyan-500"
          />

          Remember Me

        </label>


        <Link
          to="/forgot-password"
          className="
            text-sm
            text-pink-400
            hover:text-pink-300
            hover:underline
            transition
          "
        >
          Forgot Password?
        </Link>

      </div>


      {/* =================================================
          LOGIN ERROR
      ================================================= */}

      {loginError && (

        <div
          className="
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-300
          "
        >

          {loginError}

        </div>

      )}


      {/* =================================================
          LOGIN BUTTON
      ================================================= */}

      <button
        type="submit"
        disabled={loading}

        className={`
          w-full
          rounded-xl
          py-3
          font-semibold
          transition-all
          duration-200
          ${
            loading
              ? "cursor-not-allowed bg-slate-600 text-slate-300"
              : selectedRole === "Admin"
                ? "bg-pink-500 text-slate-950 hover:bg-pink-400 shadow-lg shadow-pink-500/20"
                : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
          }
        `}
      >

        {loading
          ? "Signing In..."
          : `Login as ${selectedRole}`}

      </button>


      {/* =================================================
          ADMIN INFORMATION
          Only visible for Admin
      ================================================= */}

      {selectedRole === "Admin" && (

        <p
          className="
            text-center
            text-xs
            text-slate-500
          "
        >
          Admin access is restricted to authorized administrators.
        </p>

      )}


      {/* =================================================
          STUDENT ONLY SECTION
      ================================================= */}

      {selectedRole === "Student" && (

        <>

          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="text-center text-sm text-gray-400">

            <p>

              Don't have an account?{" "}

              <Link
                to="/register"
                className="
                  text-cyan-400
                  hover:text-cyan-300
                  hover:underline
                "
              >
                Register
              </Link>

            </p>

          </div>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="relative my-6">

            <div className="absolute inset-0 flex items-center">

              <div className="w-full border-t border-slate-700" />

            </div>


            <div className="relative flex justify-center text-sm">

              <span className="bg-slate-900 px-4 text-gray-400">
                OR
              </span>

            </div>

          </div>


          {/* =================================================
              GOOGLE LOGIN
          ================================================= */}

          <GoogleButton
            text="Continue with Google"
          />

        </>

      )}

    </form>

  );

}


export default LoginForm;