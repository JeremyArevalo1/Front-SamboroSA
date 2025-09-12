import { useState, useCallback } from "react";
import { getUsers } from "../../../services/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => { 
    setLoading(true);
    setError(null);

    const result = await getUsers(); // ahora trae todos los usuarios

    if (result.success) {
      setUsers(result.data.users);
      setTotal(result.data.total);
    } else {
      setError(result.msg);
    }

    setLoading(false);
    return result;
  }, []);

  return {
    users,
    total,
    loading,
    error,
    fetchUsers,
  };
};