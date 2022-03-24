import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function RecipesListItem({ recipe }) {
  const details = useSelector((store) => store.findDetails);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (recipeId) => {
    dispatch({ type: "FETCH_DETAILS", payload: recipeId });

    history.push(`/details/${recipeId}`);
  };
  // // console.log("details = ", details.data);
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 px-4 inline-flex flex-col items-center justify-center">
      <div className="card-shadow rounded-lg overflow-hidden mb-10 inline-flex flex-col items-center justify-center">
        <img className="w-full card-image" src={recipe.image} alt={recipe.title} />
        <h2 className="p-8 sm:p-9 md:p-7 xl-p-9 text-center">{recipe.title}</h2>
        <button
          // onClick={handleClick}
          onClick={() => {
            handleClick(recipe.id);
          }}
          to="#"
          className="button"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default RecipesListItem;
