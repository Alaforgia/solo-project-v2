import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function RecipesListItem({ recipe }) {
  const details = useSelector((store) => store.findDetails);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (recipeClicked) => {
    dispatch({ type: "FETCH_DETAILS", payload: recipeClicked });

    history.push(`/details/${recipeClicked}`);
  };
  // console.log("details = ", details.data);
  return (
    <div value={recipe.id} className="w-full md:w-1/2 xl:w-1/3 px-4">
      <div className="card-shadow rounded-lg overflow-hidden mb-10 inline-flex flex-col items-center justify-center">
        <img className="w-full " src={recipe.image} alt={recipe.title} />
        <h2 className="p-8 sm:p-9 md:p-7 xl-p-9 text-center">{recipe.title}</h2>
        <button
          // onClick={handleClick}
          onClick={() => {
            handleClick(recipe.id);
          }}
          to="#"
          className="button-max-width font-semibold hover:text-[#171515] hover:bg-[#f6f9f0] hover:border-[#171515] py-2 px-7 
        border border-[#171515] bg-[#171515] text-[#f6f9f0] rounded-full transition mb-9 w-160 md:w-160 xl:w-160"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default RecipesListItem;
