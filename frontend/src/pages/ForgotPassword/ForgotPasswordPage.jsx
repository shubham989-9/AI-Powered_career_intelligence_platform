import AuthLayout from "../../components/auth/AuthLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your registered email to receive a password reset link."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPasswordPage;