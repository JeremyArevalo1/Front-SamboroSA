import { useState } from "react";
import { toast } from "react-toastify";
import { toggleLikeComment } from "../../../services/api";

export const useToggleLike = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleLike = async (commentId) => {
    if (!commentId) {
      const msg = "commentId es requerido";
      setError(msg);
      console.error(msg);
      return { success: false, msg };
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Enviando petición para toggle like, commentId:", commentId);
      const res = await toggleLikeComment(commentId);
      
      console.log("Respuesta del servidor:", res);

      if (!res.success) {
        setError(res.msg || "Error al procesar like");
        toast.error(res.msg || "Error al procesar like");
        return { success: false, msg: res.msg || "Error" };
      }

      // Verificar que los datos estén completos
      const likes = res.data?.likes || [];
      const likesCount = res.data?.likesCount ?? likes.length;
      
      // Log para debugging
      console.log("Likes recibidos:", likes);
      console.log("Cantidad de likes:", likesCount);
      
      // Solo mostrar toast si no hay error
      const message = res.data?.msg || "Acción realizada";
      toast.success(message, { autoClose: 2000 });
      
      return {
        success: true,
        likes: likes,
        likesCount: likesCount,
        msg: message
      };
    } catch (err) {
      console.error("Error en handleToggleLike:", err);
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