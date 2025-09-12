import React, { useEffect, useState } from "react";
import { searchUser } from "../../../services/api";
import { toast } from "react-toastify";

export const useSearchUser = (term) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!term) return;
    setLoading(true);
    setError(null);
    try {
      const res = await searchUser(term);
      if (res.success) {
        setUserData(res.data);
      } else {
        setError(res.msg);
        toast.error(res.msg);
      }
    } catch (err) {
      setError(err.message || "Error inesperado");
      toast.error(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  // se ejecuta cuando cambia el term
  useEffect(() => {
    fetchUser();
  }, [term]);

  return {
    userData,
    loading,
    error,
    fetchUser,
  };
};
