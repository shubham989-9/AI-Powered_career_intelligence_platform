import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function ForgotPasswordForm() {

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    setLoading(true);

    console.log(data);

    setTimeout(() => {

      setLoading(false);

      alert("Password reset link sent successfully.");

    },1500);

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <div>

        <label className="block mb-2 text-sm">
          Email Address
        </label>

        <input
          type="email"
          autoComplete="email"
          placeholder="Enter your registered email"
          {...register("email",{
            required:"Email is required",
            pattern:{
              value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message:"Invalid Email Address"
            }
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

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg py-3 font-semibold transition ${
          loading
            ? "bg-cyan-700 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-600"
        }`}
      >
        {loading ? "Sending Reset Link..." : "Send Reset Link"}
      </button>

      <div className="text-center">

        <Link
          to="/login"
          className="text-cyan-400 hover:underline"
        >
          Back to Login
        </Link>

      </div>

    </form>

  );
}

export default ForgotPasswordForm;