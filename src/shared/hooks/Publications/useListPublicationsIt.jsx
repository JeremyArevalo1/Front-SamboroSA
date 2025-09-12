import React, { useState, useEffect, useContext } from "react";
import { getPublicationsIt } from "../../../services/api";
import { AppContext } from "../../../components/AppContext/AppContext";

export const usePublicationsIt = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refresh } = useContext(AppContext);

  const fetchPublications = async () => {
    setLoading(true);
    const result = await getPublicationsIt();
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
