import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { addPublication } from "../../../services/api";
import { AppContext } from "../../../components/AppContext/AppContext";

export const useCreatePublication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [publication, setPublication] = useState(null);
  const { triggerRefresh } = useContext(AppContext);

  const handleCreatePublication = async ({ description, image, area }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await addPublication({ description, image, area });

      if (result.success) {
        setSuccess(true);
        setPublication(result.data);
        toast.success("Publicación creada con éxito"); // alerta exitosa
        triggerRefresh();
      } else {
        setError(result.msg);
        toast.error(`Error: ${result.msg}`); // alerta de error
      }
    } catch (err) {
      const msg = err.message || "Error inesperado";
      setError(msg);
      toast.error(`Error: ${msg}`); // alerta de error
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, error, success, publication, handleCreatePublication };
};
