import axios from "axios";

export const api = axios.create({
  baseURL: "https://findybackend-development.up.railway.app",
});
export const createUser = async (body: any) => {
  try {
    const response = await api.post("/api/candidate-users", body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.status === 201) {
      alert("ok")
      return { status: 201, success: true, message: 'Conta criada com sucesso!'  };
    } else {
      return { success: false, message: 'Erro desconhecido' };
    }
  } catch (error: any) {
    if (error.response.status === 409) {
      return { sucess:false , status: 409, message: 'Esse email já existe' };
    } else {
      return { success: false, message: 'Erro desconhecido' };
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/login", {email,password}, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      return { data: response,status: 200, success: true, message: 'Conta criada com sucesso!'  };
    } else {
      return { success: false, message: 'Erro desconhecido' };
    }
  } catch (error: any) {
    
  }
};


export const getTest =  async () => {
  return await api.get("/api/candidate-projects")
};

export default api;
