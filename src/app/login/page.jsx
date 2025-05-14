// app/login/page.jsx
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Publisher/Admin Login
        </h1>
        <LoginForm />
      </div>
      <div className="mt-4 text-gray-600">
        <p>
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 font-bold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;