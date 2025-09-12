// useSearchUser.js
import { useState, useEffect } from "react";
import { searchUser } from "../../../services/api";
import { toast } from "react-toastify";

export const useBarSearchUser = (initialTerm = "", allUsers = []) => {
  const [term, setTerm] = useState(initialTerm);
  const [userData, setUserData] = useState(allUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (searchTerm) => {
    setTerm(searchTerm); // actualizar término
    if (!searchTerm) {
      // Si el input está vacío, mostrar todos los usuarios
      setUserData(allUsers);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await searchUser(searchTerm);
      if (res.success) {
        setUserData(res.data);
      } else {
        setUserData([]); // limpiar resultados si no hay coincidencias
        toast.error(res.msg);
      }
    } catch (err) {
      setError(err.message || "Error inesperado");
      toast.error(err.message || "Error inesperado");
      setUserData([]);
    } finally {
      setLoading(false);
    }
  };

  // Llenar la lista inicial de usuarios al montar
  useEffect(() => {
    setUserData(allUsers);
  }, [allUsers]);

  return {
    term,
    setTerm,
    userData,
    loading,
    error,
    search, // 🔹 esta función la llama el botón de lupa
  };
};
