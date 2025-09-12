import { useEffect, useState, useContext } from "react";
import { getCommentsByPublication } from "../../../services/api";
import { toast } from "react-toastify";
import { AppContext } from "../../../components/AppContext/AppContext";

export const useCommentsByPublications = (publicationId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refresh, triggerRefresh } = useContext(AppContext); // 👈 usamos tu context

  const fetchComments = async () => {
    if (!publicationId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getCommentsByPublication(publicationId);
      if (res.success) {
        setComments(res.data || []);
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

  useEffect(() => {
    fetchComments();
  }, [publicationId, refresh]); // 👈 escucha refresh global

  return {
    comments,
    loading,
    error,
    fetchComments,
    triggerRefresh, // 👈 lo exponemos para que el componente pueda forzar recarga
  };
};