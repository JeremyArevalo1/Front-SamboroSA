import { useState } from "react";
import { toast } from "react-toastify";
import { updatePublication } from "../../../services/api"; // tu API

export const useUpdatePublication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleEditPublication = async ({ id, description, image }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await updatePublication(id, { description, image });

      if (result.success) {
        setSuccess(true);
        toast.success("¡Publicación actualizada!");
        return result.data;
      } else {
        setError(result.msg);
        toast.error(result.msg);
      }
    } catch (err) {
      setError(err.message || "Error desconocido");
      toast.error(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleEditPublication };
};
