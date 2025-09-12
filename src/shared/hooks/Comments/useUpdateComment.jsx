import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { updateComment } from "../../../services/api";
import { AppContext } from "../../../components/AppContext/AppContext";

export const useUpdateComment = () => {
  const [loading, setLoading] = useState(false);
  const { triggerRefresh } = useContext(AppContext); // 👈 usamos el contexto

  const handleUpdateComment = async (commentId, text) => {
    if (!text.trim()) {
      toast.error("El comentario no puede estar vacío");
      return null;
    }

    setLoading(true);

    try {
      const response = await updateComment(commentId, { text });

      if (!response.success) {
        toast.error(response.msg || "No se pudo actualizar el comentario");
        return null;
      }

      toast.success("Comentario actualizado correctamente");
      triggerRefresh(); // 👈 notificamos a los hooks dependientes (ej: useCommentsByPublications)

      return response.data; // comentario actualizado con populate
    } catch (err) {
      toast.error(err.message || "Error inesperado al actualizar comentario");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdateComment,
    loading,
  };
};
