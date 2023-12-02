"use client";
import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logged, setIsLogged] = useState(false);

  const toSetLogged = useCallback((value: boolean) => {
    setIsLogged(value);
  }, []);

  return (
    <AuthContext.Provider value={{ logged, toSetLogged }}>
      {children}
    </AuthContext.Provider>
  );
}
