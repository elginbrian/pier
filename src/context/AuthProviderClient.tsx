"use client";

import React from "react";
import { AuthProvider } from "./AuthContext";

const AuthProviderClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthProviderClient;
