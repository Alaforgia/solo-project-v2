import React from "react";
import RecipesListItem from "./RecipesListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function RecipesList({ recipes }) {
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch({ type: "FETCH_RECIPES" });
    }, []);

  return (
    <div className="flex flex-wrap -mx-4 justify-center items-center w-[100vw]">
      {recipes.map((recipe, index) => {
        return <RecipesListItem key={index} recipe={recipe} />;
      })}
    </div>
  );
}

export default RecipesList;