// contexts/AuthContext.js or a similar file
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import mondaySdk from "monday-sdk-js";

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export const useAuth = () => useContext(AuthContext);

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const monday = mondaySdk();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the current environment is localhost
        if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
        ) {
          setIsAuthenticated(true); // Automatically set as authenticated on localhost
        } else {
          // Proceed with the normal authentication check
          const result = await monday.get("sessionToken");
          setIsAuthenticated(!!result.data); // Set true if there's a token
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    void checkAuth();
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
