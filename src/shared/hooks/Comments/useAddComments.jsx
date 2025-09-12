import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { addComment as addCommentApi } from "../../../services/api";
import { AppContext } from "../../../components/AppContext/AppContext";

export const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const { triggerRefresh } = useContext(AppContext); // 👈 traemos triggerRefresh

  const addComment = async ({ text, publication }) => {
    if (!text.trim()) {
      toast.error("Debes escribir un comentario");
      return null;
    }

    setLoading(true);

    try {
      const result = await addCommentApi({ text, publication });
      if (result.success) {
        toast.success("Comentario agregado");
        triggerRefresh(); // 👈 avisa al contexto para que recarguen los hooks que dependen de refresh
        return result.data; // devuelve el comentario agregado
      } else {
        toast.error(result.msg || "Error al agregar comentario");
        return null;
      }
    } catch (error) {
      toast.error(error.message || "Error inesperado");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addComment, loading };
};
