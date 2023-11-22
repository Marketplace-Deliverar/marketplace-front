import React, { createContext, useState, useContext, useEffect } from "react";
import { getLoggedInInformation, logoutFromSession } from "../apis/authApis";

const AuthenticationContext = createContext();

// Función para acceder al contexto desde otros componentes
export function useAuth() {
  return useContext(AuthenticationContext);
}

const AuthenticationContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const data = await getLoggedInInformation();
      if (Object.keys(data).length === 0) {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        setUser(data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      await logoutFromSession();
    } catch (error) {
      console.error(error);
    }
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) login();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
