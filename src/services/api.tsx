import axios from "axios";

export const api = axios.create({
  baseURL: "https://findybackend-development.up.railway.app",
});
export const createUser = async (body: any) => {
  try {
    const response = await api.post("/api/candidate-users", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      alert("ok");
      return {
        status: 201,
        success: true,
        message: "Conta criada com sucesso!",
      };
    } else {
      return { success: false, message: "Erro desconhecido" };
    }
  } catch (error: any) {
    if (error.response.status === 409) {
      return { sucess: false, status: 409, message: "Esse email já existe" };
    } else {
      return { success: false, message: "Erro desconhecido" };
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/login", { email, password });
    if (response.status === 200) {
      return {
        data: response,
        status: 200,
        success: true,
        message: "Conta criada com sucesso!",
      };
    } else {
      return { success: false, message: "Erro desconhecido" };
    }
  } catch (error: any) {}
};

export const formProject = async (body: any) => {
  try {
    
    return await api.post("/api/candidate-projects", body);
  } catch (error: any) {
    console.log(error);
  }
};

export const getProjects = async () => {
  const options = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIiwicm9sZXMiOiJjYW5kaWRhdGUiLCJpYXQiOjE2ODEzMjQ4MzgsImV4cCI6MTY4MTMzMjgzOH0.Q_QYUqHig7gbE-JFoLVdc1KKgmBz3sCtpGW6XEfvgRo`, // O token é uma string que representa o token de autenticação
    },
  };
  return await api.get("/api/candidate-projects",options);
};
export const getPositions = async () => {
  const options = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIiwicm9sZXMiOiJjYW5kaWRhdGUiLCJpYXQiOjE2ODEzMjQ4MzgsImV4cCI6MTY4MTMzMjgzOH0.Q_QYUqHig7gbE-JFoLVdc1KKgmBz3sCtpGW6XEfvgRo`, // O token é uma string que representa o token de autenticação
    },
  };
  return await api.get("/api/candidate-projects/roles", options);
};

export const getLanguages = async () => {
  const options = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIwLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIiwicm9sZXMiOiJjYW5kaWRhdGUiLCJpYXQiOjE2ODEzMjQ4MzgsImV4cCI6MTY4MTMzMjgzOH0.Q_QYUqHig7gbE-JFoLVdc1KKgmBz3sCtpGW6XEfvgRo`, // O token é uma string que representa o token de autenticação
    },
  };
  return await api.get("/api/candidate-projects/skills", options);
};

export default api;
