import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.scss";
import App from "./App.tsx";
import { ProductProvider } from "./context/product.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>
);
