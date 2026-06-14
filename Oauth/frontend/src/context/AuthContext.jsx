import { createContext, useEffect, useState } from "react";
import { getStoredToken, storeToken } from "@/lib/auth";
import { getTokenFromURL } from "@/lib/auth";
import PropTypes from "prop-types";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlToken = getTokenFromURL();
    const localToken = getStoredToken();

    if (urlToken) {
      storeToken(urlToken);
      setToken(urlToken);
      window.history.replaceState({}, "", "/");
    } else if (localToken) {
      setToken(localToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
