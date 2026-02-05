import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useHttp } from "../hooks/useHttp";
const AuthContext = createContext();

// custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Use our new hook
  const { 
    loading, error, message, 
    setLoading, setError, setMessage, 
    get, post 
  } = useHttp();

  const AUTH_URL = "/auth";

  // -------------------- Login --------------------
  const login = async (credentials) => {
    try {
      const data = await post(`${AUTH_URL}/login`, credentials);
      setUser(data.user);
      setMessage("Login successful ✅");
    } catch (err) {
      // Error is already set in hook state
    }
  };

  // -------------------- Register --------------------
  const register = async (formData) => {
    try {
      const data = await post(`${AUTH_URL}/register`, formData);
      setUser(data.user);
      setMessage("Registration successful ✅");
    } catch (err) { }
  };

  // -------------------- Logout --------------------
  const logout = async () => {
    try {
      await post(`${AUTH_URL}/logout`);
      setUser(null);
      setMessage("Logged out ✅");
      localStorage.removeItem("theme");
    } catch (err) {
      setError("Logout failed");
    }
  };

  // -------------------- Initial Check --------------------
useEffect(() => {
  let isMounted = true;

  const checkUser = async () => {
    
    try {
      // If this call fails (e.g., 401 Unauthorized), the catch block runs
      const data = await get("/auth/me");
      if (isMounted && data?.user) {
        setUser(data.user);

      }
    } catch (err) {
      if (isMounted) setUser(null);setError(null)
    } finally {
     
    }
  };

  checkUser();
  return () => { isMounted = false; };
}, [get]); // 'get' is now stable thanks to useCallback

  // -------------------- Toasts --------------------
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null); 
    }
    if (message) {
      toast.success(message);
      setMessage(null); 
    }
  }, [error, message, setError, setMessage]);

  const value = { user, loading, error, message,setLoading,setMessage, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
