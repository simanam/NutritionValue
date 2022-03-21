import React from "react";

const Nutrition = ({ nutritionData, desc }) => {
  return (
    <div>
      <h5>{desc}</h5>
      <div className="flex flex-wrap">
        {nutritionData?.map(({ nutrientId, nutrientName, value, unitName }) => {
          if (value > 0) {
            return (
              <div
                className="basis-1/4 md:basis-1/4 sm:basis-1/2  h-14 hover:grow-0"
                key={nutrientId}
              >
                <p>{nutrientName}</p>
                <p>
                  {value} {unitName}
                </p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Nutrition;
