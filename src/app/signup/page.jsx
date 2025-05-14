// app/signup/page.jsx
import SignupForm from '../../components/auth/SignupForm';

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Publisher Signup
        </h1>
        <SignupForm />
      </div>
      <div className="mt-4 text-gray-600">
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 font-bold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;