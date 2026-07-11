import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your AI career journey today."
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;