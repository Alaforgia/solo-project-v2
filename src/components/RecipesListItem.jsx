import React from "react";
import { Link } from "react-router-dom";

function RecipesListItem({ recipe }) {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 px-4">
      <div className="card-shadow rounded-lg overflow-hidden mb-10 inline-flex flex-col items-center justify-center">
        <img className="w-full " src={recipe.image} alt={recipe.name} />
        <h2 className="p-8 sm:p-9 md:p-7 xl-p-9 text-center"> {recipe.name}</h2>
        <Link
          to="#"
          className="button-max-width font-semibold hover:text-[#171515] hover:bg-[#f6f9f0] hover:border-[#171515] py-2 px-7 
        border border-[#171515] bg-[#171515] text-[#f6f9f0] rounded-full transition mb-9 w-160 md:w-160 xl:w-160"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default RecipesListItem;