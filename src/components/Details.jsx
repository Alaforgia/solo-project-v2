import React from "react";
import RecipesList from "./RecipesList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Details() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS" });
  }, []);

  return (
    <>
      <h2>Details</h2>
      
    </>
  );
}
export default Details;
