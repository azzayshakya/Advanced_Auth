import AuthButton from "@/components/AuthButton";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">OAuth Demo</h1>
      {token ? (
        <>
          <p className="mt-2 text-green-600">Logged in with token!</p>
          <button onClick={logout} className="mt-2 text-red-500 underline">
            Logout
          </button>
        </>
      ) : (
        <AuthButton />
      )}
    </div>
  );
};

export default Home;
