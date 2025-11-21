import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-[#181818] rounded-lg h-[300px] p-4">
      <div className="bg-[#f9731644] h-[70%] w-full rounded-md"></div>
      <div className="bg-[#f9731644] h-4 w-[80%] mt-3 rounded"></div>
      <div className="bg-[#f9731644] h-3 w-[60%] mt-2 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
