import axios from "axios";

const apiSamboro = axios.create({
    baseURL: "https://backsamborosa.onrender.com/samboroProyect/v1",
    timeout: 5000,
    headers: {"cache-Control": "no-cache, no-store, must-revalidate"}
});

apiSamboro.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user");
        if (user) {
            const token = JSON.parse(user).token;
            config.headers["x-token"] = token;
        }
        return config;
    },
    (e) => Promise.reject(e)
);

//-----------auth-----------------//
export const login = async (data) => {
    try {
        const response = await apiSamboro.post("/auth/login", data);
        return {
            success: true,
            data: response.data
        };
    } catch (err) {
        return {
        success: false,
        msg: err.response?.data?.msg || "Error desconocido del servidor",
        error: err.response?.data || err.message,
        };
    }
};

export const register = async (data) => {
  try {
    const response = await apiSamboro.post("/auth/register", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al registrar usuario",
      error: err.response?.data || err.message,
    };
  }
};


//-------------------users---------------------//
export const getUsers = async () => {
  try {
    const response = await apiSamboro.get("/users/listUsers");

    return {
        success: true,
        data: response.data
    };
    
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al obtener los usuarios",
      error: err.response?.data || err.message,
    };
  }
};

export const searchUser = async (term) => {
  try {
    const response = await apiSamboro.get(`/users/search?term=${encodeURIComponent(term)}`);

    return {
      success: true,
      data: response.data.results || []
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al buscar usuario",
      error: err.response?.data || err.message,
    };
  }
};

//------------------publications-----------------------//

// Obtener todas las publicaciones con comentarios
export const getPublicationsIt = async () => {
  try {
    const response = await apiSamboro.get("/publications/listPublications/it"); // tu endpoint real
    return {
      success: true,
      data: response.data.publications || []
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al obtener publicaciones",
      error: err.response?.data || err.message,
    };
  }
};

export const getPublicationsRRHH = async () => {
  try {
    const response = await apiSamboro.get("/publications/listPublications/rrhh"); // tu endpoint real
    return {
      success: true,
      data: response.data.publications || []
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al obtener publicaciones",
      error: err.response?.data || err.message,
    };
  }
};
export const getPublicationsMarketing = async () => {
  try {
    const response = await apiSamboro.get("/publications/listPublications/marketing"); // tu endpoint real
    return {
      success: true,
      data: response.data.publications || []
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al obtener publicaciones",
      error: err.response?.data || err.message,
    };
  }
};

// Crear una publicación
export const addPublication = async ({ description, image, area }) => {
  try {
    const response = await apiSamboro.post("/publications/addPublications", {
      description,
      image,
      area
    });

    return {
      success: true,
      data: response.data.publication,
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al crear publicación",
      error: err.response?.data || err.message,
    };
  }
};

// services/api.js (añadir)
export const toggleLikePublication = async (publicationId) => {
  try {
    // Ajusta el path si tu ruta es diferente: /publications/toggleLike/:id es la suposición
    const response = await apiSamboro.put(`/publications/like/${publicationId}`);
    // El backend devuelve: { success: true, msg, likesCount, likes }
    return {
      success: true,
      data: response.data
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al cambiar el like",
      error: err.response?.data || err.message
    };
  }
};

// Editar una publicación
export const updatePublication = async (id, { description, image }) => {
  try {
    const response = await apiSamboro.put(`/publications/updatePublications/${id}`, {
      description,
      image,
    });

    return {
      success: true,
      data: response.data.publication,
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al editar publicación",
      error: err.response?.data || err.message,
    };
  }
};

//------------------comments-----------------------//

// Agregar un comentario

// Obtener comentarios por publicación
export const getCommentsByPublication = async (publicationId) => {
  try {
    const response = await apiSamboro.get(`/comments/getcommentsByPublication/${publicationId}`);
    return {
      success: true,
      data: response.data.publiComments || []
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al obtener comentarios",
      error: err.response?.data || err.message,
    };
  }
};

export const addComment = async ({ text, publication }) => {
  try {
    const response = await apiSamboro.post("/comments/addComment", {
      text,
      publication
    });

    return {
      success: true,
      data: response.data.comment, // comentario recién creado
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al agregar comentario",
      error: err.response?.data || err.message,
    };
  }
};

// Editar un comentario
export const updateComment = async (commentId, { text }) => {
  try {
    const response = await apiSamboro.put(`/comments/updateComment/${commentId}`, {
      text,
    });

    return {
      success: true,
      data: response.data.comment, // comentario actualizado con populate
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al actualizar comentario",
      error: err.response?.data || err.message,
    };
  }
};

// services/api.js (añadir)
export const toggleLikeComment = async (commentId) => {
  try {
    // Ajusta el path si tu ruta es diferente: /publications/toggleLike/:id es la suposición
    const response = await apiSamboro.put(`/comments/like/${commentId}`);
    // El backend devuelve: { success: true, msg, likesCount, likes }
    return {
      success: true,
      data: response.data
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response?.data?.msg || "Error al cambiar el like",
      error: err.response?.data || err.message
    };
  }
};