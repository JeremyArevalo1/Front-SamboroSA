import React, { useState, useEffect, useContext } from "react";
import { getPublicationsMarketing } from "../../../services/api";
import { AppContext } from "../../../components/AppContext/AppContext";

export const usePublicationsMarketing = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refresh } = useContext(AppContext);

  const fetchPublications = async () => {
    setLoading(true);
    const result = await getPublicationsMarketing();
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
