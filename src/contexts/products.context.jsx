import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

//actual data
export const ProductsContext = createContext({
  products: [],
});

//Actual Provider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = {products};

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};
