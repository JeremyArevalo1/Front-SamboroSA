import { useState } from "react";
import { register as registerUser } from "../../../services/api";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);

  const register = async (formData) => {
    setLoading(true);

    const result = await registerUser(formData);

    if (result.success) {
      toast.success("Usuario registrado con éxito");
    } else {
      toast.error(`${result.msg || "Error al registrar usuario"}`);
    }

    setLoading(false);
    return result;
  };

  return {
    register,
    loading,
  };
};
