import React, { createContext, useState, useContext } from "react";

const AuthenticationContext = createContext();

// Función para acceder al contexto desde otros componentes
export function useAuth() {
  return useContext(AuthenticationContext);
}

const AuthenticationContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Aca almacenamos la información del usuario loggeado, inicialmente null
  const [user, setUser] = useState(null); // Aca almacenamos la información del usuario loggeado, inicialmente null

  // Función para manejar el inicio de sesión
  const login = async (credentials) => {
    try {
      // Aca tenemos que hacer la autenticación mediante una API de usuarios o obtener los datos del usuario nosotros
      // const user = await authService.login(credentials);
      // setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error(error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Operaciones necesarias para cerrar sesión, como limpiar el estado
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
