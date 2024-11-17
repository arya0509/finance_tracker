'use client';
import { AuthContextProvider } from "./_utils/auth-context"; // Importing the AuthContextProvider
import "./globals.css"; // Import your global CSS for Tailwind or other global styles

// Optional: Re-import custom fonts if needed
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      {/* Apply the font and global styles to the body */}
      <body className={`${geistSans.variable} antialiased`}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
