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
   
  }
};

export const getProjects = async () => {
  return await api.get("/api/candidate-projects");
};
export const getPositions = async () => {
  return await api.get("/api/candidate-projects/roles");
};

export const getLanguages = async () => {
  return await api.get("/api/candidate-projects/skills");
};
export const getLanguagesById = async (id: string) => {
  return await api.get(`/api/candidate-projects/skills/${id}`);
};

export const getUserById = async (id: number) => {
  return await api.get(`/api/candidate-profile/1`);
};


export const getCandidatesUsers = async () => {

  return await api.get("/api/candidate-users");
}

export const getCandidateUser = async (id: string) => {

  return await api.get(`/api/candidate-users/${id}`);
}


export const getCandidatesProfiles = async () => {

  return await api.get("/api/candidate-profile");
}

export const updateProfile = async (body: any) => {
  try {

    return await api.post("/api/candidate-profile", body);
  } catch (error: any) {
    console.log(error);
  }
};

export default api;
