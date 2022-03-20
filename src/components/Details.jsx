import React from "react";
import RecipesList from "./RecipesList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesListItem from "./RecipesListItem";
import { useParams } from "react-router-dom";

function Details() {
  const dispatch = useDispatch();
  const details = useSelector((store) => store.findDetails);
  useEffect(() => {
    // dispatch({ type: "FETCH_DETAILS" });
  }, []);
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <h2>Details</h2>
      <div>
        {details.map((detail, index) => {
          return <RecipesListItem key={index} recipe={detail} />;
        })}
      </div>
      <div>{id}</div>
    </>
  );
}
export default Details;
