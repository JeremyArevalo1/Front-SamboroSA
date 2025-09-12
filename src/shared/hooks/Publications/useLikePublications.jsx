import { useState } from "react";
import { toast } from "react-toastify";
import { toggleLikePublication } from "../../../services/api"; // misma ruta que usas en otros hooks

/**
 * useToggleLike
 * - handleToggleLike(publicationId) => realiza la petición y devuelve { success, likes, likesCount, msg }
 * - loading / error para manejar estados en el UI
 */
export const useToggleLike = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleLike = async (publicationId) => {
    if (!publicationId) {
      const msg = "PublicationId es requerido";
      setError(msg);
      return { success: false, msg };
    }

    setLoading(true);
    setError(null);

    try {
      const res = await toggleLikePublication(publicationId);

      if (!res.success) {
        setError(res.msg || "Error al procesar like");
        toast.error(res.msg || "Error al procesar like");
        return { success: false, msg: res.msg || "Error" };
      }

      // res.data -> { msg, likesCount, likes }
      toast.success(res.data.msg || "Acción realizada");
      return {
        success: true,
        likes: res.data.likes || [],
        likesCount: res.data.likesCount ?? (res.data.likes ? res.data.likes.length : 0),
        msg: res.data.msg
      };
    } catch (err) {
      const msg = err.message || "Error inesperado";
      setError(msg);
      toast.error(msg);
      return { success: false, msg };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleToggleLike
  };
};