import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/authService";

import app from "../firebase";

const AuthContext = createContext(null);

const auth = getAuth(app);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "Customer",
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    return await loginUser(email, password);
  };

  const register = async (name, email, password) => {
  return await registerUser(name, email, password);
};

  const logout = async () => {
    await logoutUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}