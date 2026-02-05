import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { Toaster } from "react-hot-toast";
import "./i18n";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0d1b11",
            color: "#fff",
            fontWeight: "600",
          },
          success: {
            iconTheme: {
              primary: "#11d452",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
        reverseOrder={false}
      />

      
    </AuthProvider>
  </StrictMode>
);
