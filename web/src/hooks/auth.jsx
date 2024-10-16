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

  function signOut(navigate) {
    localStorage.removeItem("@Foodexplore:user");
    localStorage.removeItem("@Foodexplore:token");
    localStorage.removeItem("@Foodexplore:amountsToBePaid");

    setData({});
    navigate("/");
  }

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

    // Interceptor para lidar com falhas de autenticação
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          signOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
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
