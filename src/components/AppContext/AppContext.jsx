import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(0);

  const [user, setUser] = useState(null);

  // Función para disparar refresh global
  const triggerRefresh = () => setRefresh(prev => prev + 1);

  // Cargar usuario desde localStorage una sola vez
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        _id: parsed.user[0],
        profilePhoto: parsed.user[1],
        name: parsed.user[2],
        surname: parsed.user[3],
        username: parsed.user[4],
        email: parsed.user[5],
        role: parsed.user[6],
        permissions: parsed.user[7],
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ refresh, triggerRefresh, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
