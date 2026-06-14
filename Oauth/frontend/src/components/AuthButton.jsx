const AuthButton = () => {
const handleGoogleLogin = () => {
  console.log("Redirecting to:", `${import.meta.env.VITE_BACKEND_URL}/auth/google`);
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
};

  return (
    <button
      onClick={handleGoogleLogin}
      className="rounded-md bg-blue-600 px-4 py-2 text-white"
    >
      Login with Google
    </button>
  );
};

export default AuthButton;
