import React from "react";
import RecipesList from "../components/RecipesList";
import SearchRecipes from "../components/SearchRecipes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function MyRecipes() {
  const dispatch = useDispatch();

  const recipes = useSelector((store) => store.recipeGet);
  console.log("What is this =", recipes);

  useEffect(() => {
    dispatch({ type: "FETCH_RECIPES", payload: recipes.data });
  }, []);
  // const recipes = [
  //   {
  //     name: "Tomato Bisque",
  //     image: "/src/Images/tomatobisque.jpeg",
  //   },
  //   {
  //     name: "Tomato Bisque",
  //     image: "src/images/tomatobisque.jpeg",
  //   },
  //   {
  //     name: "Tomato Bisque",
  //     image: "src/images/tomatobisque.jpeg",
  //   },
  //   {
  //     name: "Tomato Bisque",
  //     image: "src/images/tomatobisque.jpeg",
  //   },
  //   {
  //     name: "Tomato Bisque",
  //     image: "src/images/tomatobisque.jpeg",
  //   },
  //   {
  //     name: "Tomato Bisque",
  //     image: "src/images/tomatobisque.jpeg",
  //   },
  //   {
  //     name: "Tomato Bisque",
  //     image: "src/images/tomatobisque.jpeg",
  //   },
  // ];
  return (
    <div>
      <h1 className="text-center mb-8 text-5xl">My Recipes</h1>
      <SearchRecipes />
      <RecipesList recipes={recipes} />
    </div>
  );
}

export default MyRecipes;
