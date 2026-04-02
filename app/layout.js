'use client';
import { AuthContextProvider } from "./_utils/auth-context"; 
import "./globals.css"; 



export default function Layout({ children }) {
  return (
    <html lang="en">
     
      <body >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
