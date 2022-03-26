import React from "react";
import RecipesList from "../components/RecipesList";
import SearchRecipes from "../components/SearchRecipes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function MyRecipes() {
  const dispatch = useDispatch();

  const recipes = useSelector((store) => store.recipeGet);

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) => {
        if (recipe.title.toLowerCase().includes(searchInput.toLowerCase())) {
          return true;
        }
      })
    );
  }, [searchInput]);

  useEffect(() => {
    dispatch({ type: "FETCH_RECIPES" });
  }, []);

  return (
    <div>
      <h1 className="text-center mb-8 text-5xl font-oswald">My Recipes</h1>
      <SearchRecipes searchInput={searchInput} setSearchInput={setSearchInput} />
      <RecipesList recipes={filteredRecipes} />
    </div>
  );
}

export default MyRecipes;
