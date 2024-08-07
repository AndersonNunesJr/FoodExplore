import { createContext, useContext, useEffect, useState } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sing", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@Foodexplore:user", JSON.stringify(user));
      localStorage.setItem("@Foodexplore:token", token);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro na autenticação");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@Foodexplore:user");
    localStorage.removeItem("@Foodexplore:token");

    setData({});
  }

  //   async function updateProfile({ user, avatarFile }) {
  //     try {
  //       if (avatarFile) {
  //         const fileUploadForm = new FormData();
  //         fileUploadForm.append("avatar", avatarFile);
  //         const response = await api.patch("/users/avatar", fileUploadForm);
  //         user.avatar = response.data.avatar;
  //       }

  //       await api.put("/users", user);
  //       localStorage.setItem("@Foodexplore:user", JSON.stringify(user));
  //       setData({ user, token: data.token });
  //       alert("Perfil atualizado!");
  //     } catch (error) {
  //       if (error.response) {
  //         alert(error.response.data.message);
  //       } else {
  //         alert("Erro na atualização do perfil.");
  //       }
  //     }
  //   }

  useEffect(() => {
    const token = localStorage.getItem("@Foodexplore:token");
    const user = localStorage.getItem("@Foodexplore:user");

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user)
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
