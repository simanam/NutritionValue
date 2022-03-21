import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();

const baseUrl = "https://api.nal.usda.gov/fdc/v1/foods";

const params = {
  api_key: "#####",
  dataType: ["Survey (FNDDS)"],
  pagesize: 5,
};

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Apple");

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`);

    const data = await response.json();

    setResults(data.foods);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
