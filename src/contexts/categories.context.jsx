import { createContext, useState, useEffect } from "react";
import { addCollectionAndDcouments,getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
//actual data
export const CategoriesContext = createContext({
  categoriesMap: {},
});

//Actual Provider
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  

//Sending data to data base | we need to run it only once
// useEffect(() => {
  //   addCollectionAndDcouments("categories", SHOP_DATA);
  // }, []);

  useEffect(()=>{
  const getCategoriesMap =async()=>{
    const categoryMap = await getCategoriesAndDocuments(); 
    console.log(categoryMap);
    setCategoriesMap(categoryMap)
}
  getCategoriesMap();
},[])

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
