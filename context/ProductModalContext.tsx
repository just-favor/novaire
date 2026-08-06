"use client";

import { createContext, useContext, useState } from "react";
import { Product } from "@/data/products";

interface ProductModalContextType {
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
}

const ProductModalContext = createContext<ProductModalContextType>({
  product: null,
  open: () => {},
  close: () => {},
});

export function ProductModalProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <ProductModalContext.Provider
      value={{ product, open: setProduct, close: () => setProduct(null) }}
    >
      {children}
    </ProductModalContext.Provider>
  );
}

export const useProductModal = () => useContext(ProductModalContext);
