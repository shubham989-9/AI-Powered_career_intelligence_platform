import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "./GoogleButton";

function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register",
        {
          full_name: data.fullName,
          email: data.email,
          password: data.password,
          role: data.role,
        }
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.detail || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Full Name */}

      <div>

        <label className="block mb-2 text-sm">
          Full Name
        </label>

        <input
        autoComplete="name"
          type="text"
          placeholder="Enter your full name"
          {...register("fullName", {
            required: "Full Name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
          className={`w-full rounded-lg bg-slate-800 px-4 py-3 outline-none border ${
            errors.fullName
              ? "border-red-500"
              : "border-slate-700 focus:border-cyan-400"
          }`}
        />

        {errors.fullName && (
          <p className="text-red-400 text-sm mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>

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
          className={`w-full rounded-lg bg-slate-800 px-4 py-3 outline-none border ${
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
            autoComplete="new-password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  "Min 8 chars, Uppercase, Lowercase & Number required",
              },
            })}
            className={`w-full rounded-lg bg-slate-800 px-4 py-3 pr-12 outline-none border ${
              errors.password
                ? "border-red-500"
                : "border-slate-700 focus:border-cyan-400"
            }`}
            /> {
               loading && (
            <p className="text-cyan-400 text-center">
              Creating your account...
            </p>
            )
            }

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
            {/* Confirm Password */}

      <div>

        <label className="block mb-2 text-sm">
          Confirm Password
        </label>

        <div className="relative">

          <input
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`w-full rounded-lg bg-slate-800 px-4 py-3 pr-12 outline-none border ${
              errors.confirmPassword
                ? "border-red-500"
                : "border-slate-700 focus:border-cyan-400"
            }`}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-4"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {errors.confirmPassword && (
          <p className="text-red-400 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

      </div>

      {/* Role */}

      <div>

        <label className="block mb-2 text-sm">
          Select Role
        </label>

        <select
          {...register("role", {
            required: "Please select a role",
          })}
          className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
        >
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Professional">Professional</option>
          <option value="Recruiter">Recruiter</option>
          <option value="Admin">Admin</option>
        </select>

        {errors.role && (
          <p className="text-red-400 text-sm mt-1">
            {errors.role.message}
          </p>
        )}

      </div>

      {/* Terms */}

      <div className="flex items-start gap-2">

        <input
          type="checkbox"
          className="mt-1"
          {...register("terms", {
            required: "Please accept Terms & Conditions",
          })}
        />

        <label className="text-sm text-gray-300">
          I agree to the Terms & Conditions
        </label>

      </div>

      {errors.terms && (
        <p className="text-red-400 text-sm">
          {errors.terms.message}
        </p>
      )}

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg py-3 font-semibold transition ${
          loading
            ? "bg-cyan-700 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-600"
        }`}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <div className="relative mt-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-slate-700"></div>
  </div>

  <div className="relative flex justify-center text-sm">
    <span className="bg-slate-900 px-4 text-gray-400">
      OR
    </span>
  </div>
</div>

<div className="mt-5">
  <GoogleButton text="Continue with Google" />
</div>

<p className="text-center text-gray-400 text-sm mt-5">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-cyan-400 hover:underline"
  >
    Login
  </Link>
</p>

    </form>
  );
}

export default RegisterForm;