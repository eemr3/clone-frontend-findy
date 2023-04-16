import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJuYW1lIjoiRGFyY2lvIENhcnZhbGhvIiwiZW1haWwiOiJkYXJjaW8uY2FydmFsaG8uZGV2QGdtYWlsLmNvbSIsInJvbGVzIjoiY2FuZGlkYXRlIiwiaWF0IjoxNjgxNDc5ODY4LCJleHAiOjE2ODE0ODc4Njh9.BP4yluPsDNGFGzMYn6Wuv6JQArxTnbiDJA4PU_-l3fQ";


export const api = axios.create({
  baseURL: "https://findybackend-development.up.railway.app",
  headers: {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": true,
  },
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
    const response = await api.post(
      "/api/login",
      { email, password }
    );
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
  } catch (error: any) { }
};

export const formProject = async (body: any) => {
  try {

    return await api.post("/api/candidate-projects", body);
  } catch (error: any) {
    console.log(error);
  }
};

export const getProjects = async () => {
  return await api.get("/api/candidate-projects");
};
export const getPositions = async () => {
  const options = {
    headers: {
      Authorization: token //`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImwyQGdtYWlsLmNvbSIsInJvbGVzIjoiY2FuZGlkYXRlIiwiaWF0IjoxNjgxMzA3NTk5LCJleHAiOjE2ODEzMTU1OTl9.j4BGnuvEux8DB5ytyvXJOUE2IxAZnNPdFPSuLqkVNhY` // O token é uma string que representa o token de autenticação
    }
  };
  return await api.get("/api/candidate-projects/roles"/* , options */);
};

export const getLanguages = async () => {
  const options = {
    headers: {
      Authorization: token // `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImwyQGdtYWlsLmNvbSIsInJvbGVzIjoiY2FuZGlkYXRlIiwiaWF0IjoxNjgxMzA3NTk5LCJleHAiOjE2ODEzMTU1OTl9.j4BGnuvEux8DB5ytyvXJOUE2IxAZnNPdFPSuLqkVNhY` // O token é uma string que representa o token de autenticação
    }
  };
  return await api.get("/api/candidate-projects/skills"/* , options */);
};

export const getCandidatesUsers = async () => {
  const options = {
    headers: {
      Authorization: token
    }
  };
  return await api.get("/api/candidate-users"/* , options */);
}

export const getCandidateUser = async (id: string) => {
  const options = {
    headers: {
      Authorization: token
    }
  };
  return await api.get(`/api/candidate-users/${id}`/* , options */);
}


export const getCandidatesProfiles = async () => {
  const options = {
    headers: {
      Authorization: token
    }
  };
  return await api.get("/api/candidate-profile"/* , options */);
}

export const updateProfile = async (body: any) => {
  try {

    return await api.post("/api/candidate-profile", body);
  } catch (error: any) {
    console.log(error);
  }
};

export default api;
