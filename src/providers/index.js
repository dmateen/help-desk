"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/contextProvider/authContextProvider";

export function Providers({ children }) {
  return (
    <AuthProvider>
      {/* <SessionProvider> */}
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      {/* </SessionProvider> */}
    </AuthProvider>
  );
}
