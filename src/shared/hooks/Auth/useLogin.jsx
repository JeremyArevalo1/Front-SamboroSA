import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { login as loginApi } from "../../../services/api"; 
import { AppContext } from "../../../components/AppContext/AppContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext); // usamos el contexto global

  const login = async ({ email, username, password }) => {
    if (!email && !username) {
      toast.error("Debes ingresar email o usuario");
      return null;
    }

    if (!password) {
      toast.error("Debes ingresar la contraseña");
      return null;
    }

    setLoading(true);

    const result = await loginApi({ email, username, password });

    if (result.success) {
      toast.success(result.data.msg);

      const userData = result.data.userDetails.user;

      // Actualizamos el contexto global
      setUser({
        _id: userData[0],
        profilePhoto: userData[1],
        name: userData[2],
        surname: userData[3],
        username: userData[4],
        email: userData[5],
        role: userData[6],
        permissions: userData[7],
      });

      // Guardar en localStorage para persistencia
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: userData,
          token: result.data.userDetails.token
        })
      );
    } else {
      toast.error(result.msg);
    }

    setLoading(false);
    return result;
  };

  return { login, loading };
};
