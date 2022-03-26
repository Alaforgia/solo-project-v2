import React from "react";
import RecipesListItem from "./RecipesListItem";

function RecipesList({ recipes }) {
  return (
    <div className="flex flex-wrap justify-center items-center w-[100vw]">
      {recipes.map((recipe, index) => {
        return <RecipesListItem key={index} recipe={recipe} />;
      })}
    </div>
  );
}

export default RecipesList;
