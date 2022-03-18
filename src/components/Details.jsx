import React from "react";
import RecipesList from "./RecipesList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesListItem from "./RecipesListItem";

function Details() {
  const dispatch = useDispatch();
  const details = useSelector((store) => store.findDetails);
  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS" });
  }, []);

  return (
    <>
      <h2>Details</h2>
      <p>{details[0]?.name}</p>
    </>
  );
}
export default Details;
