import React, { createContext, useState, useEffect, useContext } from "react";

const GroceriesContext = createContext();

const GroceriesProvider = ({ children }) => {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    fetch("/api/groceries")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Unauthorized");
        }
      })
      .then(setGroceries)
      .catch((error) => console.log(error.message));
  }, []);

  const addGrocery = (grocery) => {
    setGroceries([...groceries, grocery]);
  };

  const updateGrocery = (updatedGrocery) =>
    setGroceries((currentGroceries) =>
      currentGroceries.map((grocery) => {
        if (grocery.id === updatedGrocery.id) {
          return updatedGrocery;
        } else {
          return grocery;
        }
      })
    );

  const deleteGrocery = (deletedGrocery) =>
    setGroceries((currentGroceries) =>
      currentGroceries.filter((grocery) => grocery.id !== deletedGrocery.id)
    );

  return (
    <GroceriesContext.Provider
      value={{
        groceries,
        addGrocery,
        updateGrocery,
        deleteGrocery
      }}
    >
      {children}
    </GroceriesContext.Provider>
  );
};

export { GroceriesContext, GroceriesProvider };

