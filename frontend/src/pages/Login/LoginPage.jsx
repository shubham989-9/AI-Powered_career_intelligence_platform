import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your AI career journey."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage; 