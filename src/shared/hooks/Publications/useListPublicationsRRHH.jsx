import React, { useState, useEffect, useContext } from "react";
import { getPublicationsRRHH } from "../../../services/api";
import { AppContext } from "../../../components/AppContext/AppContext";

export const usePublicationsRRHH = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refresh } = useContext(AppContext);

  const fetchPublications = async () => {
    setLoading(true);
    const result = await getPublicationsRRHH();
    if (result.success) {
      setPublications(result.data);
    } else {
      setError(result.msg || "Error al cargar publicaciones");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPublications();
  }, [refresh]);

  return { publications, loading, error, refresh: fetchPublications };
};
