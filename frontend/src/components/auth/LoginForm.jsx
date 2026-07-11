import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "./GoogleButton";

function LoginForm() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log("LOGIN RESPONSE");
console.log(response.data);
alert("API Success");

      // Save Token

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // Save User

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* Email */}

      <div>

        <label className="block mb-2 text-sm">
          Email Address
        </label>

        <input
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Email Address",
            },
          })}
          className={`w-full rounded-lg bg-slate-800 border px-4 py-3 outline-none ${
            errors.email
              ? "border-red-500"
              : "border-slate-700 focus:border-cyan-400"
          }`}
        />

        {errors.email && (
          <p className="text-red-400 text-sm mt-1">
            {errors.email.message}
          </p>
        )}

      </div>

      {/* Password */}

      <div>

        <label className="block mb-2 text-sm">
          Password
        </label>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
            })}
            className={`w-full rounded-lg bg-slate-800 border px-4 py-3 pr-12 outline-none ${
              errors.password
                ? "border-red-500"
                : "border-slate-700 focus:border-cyan-400"
            }`}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-4"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {errors.password && (
          <p className="text-red-400 text-sm mt-1">
            {errors.password.message}
          </p>
        )}

      </div>
            {/* Remember Me */}

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"
            {...register("remember")}
          />

          Remember Me

        </label>

        <Link
          to="/forgot-password"
          className="text-cyan-400 hover:underline text-sm"
        >
          Forgot Password?
        </Link>

      </div>

      {loading && (
        <p className="text-cyan-400 text-center">
          Signing in...
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg py-3 font-semibold transition ${
          loading
            ? "bg-cyan-700 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-600"
        }`}
      >
        {loading ? "Signing In..." : "Login"}
      </button>

      <p className="text-center text-gray-400 text-sm">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-cyan-400 hover:underline"
        >
            <div className="relative">

  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-slate-700"></div>
  </div>

  <div className="relative flex justify-center text-sm">
    <span className="bg-slate-900 px-4 text-gray-400">
      OR
    </span>
  </div>

</div>

<GoogleButton text="Continue with Google" />
          Register
        </Link>

      </p>

    </form>

  );
}

export default LoginForm;