import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import Nutrition from "./Nutrition";
const params = {
  api_key: "zCQDRXgoPAACwzVh8dTcrXxqU3pmSMf53vEQbFKg",
  dataType: ["Survey (FNDDS)"],
  pagesize: 5,
};

const Results = () => {
  const { getResults, results, searchTerm, isLoading } = useResultContext();
  const [visible, setVisible] = useState(false);

  const [nutritionData, setNutritionData] = useState([]);
  const [desc, setDesc] = useState("");

  const location = useLocation();

  useEffect(() => {
    setVisible(false);
    getResults(
      `${location.pathname}?api_key=${encodeURIComponent(
        params.api_key
      )}&query=${searchTerm}&dataType=${encodeURIComponent(
        params.dataType
      )}&pageSize=${encodeURIComponent(params.pagesize)}`
    );
  }, [searchTerm, location.pathname]);

  const buttonClicked = (foodNutrients, description) => {
    setNutritionData(foodNutrients);
    setDesc(description);
    setVisible(true);
  };

  if (isLoading) return "....";

  switch (location.pathname) {
    case "/search":
      return (
        <div>
          <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center mt-4">
            {results?.map(({ fdcId, description, foodNutrients }) => (
              <div key={fdcId} className="md:w-2/5 w-full">
                <button
                  type="button"
                  onClick={() => buttonClicked(foodNutrients, description)}
                  className="m-2 mb-0 text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg active:bg-blue-500 active:text-gray-100"
                >
                  {description}
                </button>
              </div>
            ))}
          </div>

          {visible ? (
            <Nutrition nutritionData={nutritionData} desc={desc} />
          ) : null}
        </div>
      );

    default:
      return "ERROR";
  }
};

export default Results;
