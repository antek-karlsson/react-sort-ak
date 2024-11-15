import { createContext, useState, useEffect, ReactNode } from "react";

interface ProductContextType {
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    () => {
      const savedProductId = localStorage.getItem("selectedProductId");
      return savedProductId ? savedProductId : null;
    }
  );

  useEffect(() => {
    if (selectedProductId) {
      localStorage.setItem("selectedProductId", selectedProductId);
    } else {
      localStorage.removeItem("selectedProductId");
    }
  }, [selectedProductId]);

  return (
    <ProductContext.Provider
      value={{ selectedProductId, setSelectedProductId }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
