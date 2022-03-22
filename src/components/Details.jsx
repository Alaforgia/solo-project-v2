import React from "react";
import RecipesList from "./RecipesList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesListItem from "./RecipesListItem";
import { useParams, Link, useHistory } from "react-router-dom";

function Details() {
  const dispatch = useDispatch();
  const details = useSelector((store) => store.findDetails);
  const history = useHistory();
  // const details = useSelector((store) => store.recipeGet);
  const { id } = useParams();
  console.log("details =", details);

  // const details = details.filter((detail) => {
  //   if (detail.id == parseInt(id)) {
  //     return true;
  //   }
  // });
  console.log("Filtered Details =", details);
  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, []);
  console.log("++++++++++++++++++++++");
  setTimeout(() => {
    console.log("details length ", details?.length);
  }, 300);
  console.log(id);
  // console.log("details =", details[0]?.image);
  // console.log("filtered details =", details[0]?.image);

  // EDIT BUTTON onClick handler

  const clickEdit = () => {
    dispatch({ type: "SET_EDIT_ITEM", payload: { id } });

    history.push("/edit/" + id);
  };

  return (
    <>
      <h2>Details</h2>
      <div>
        <img
          src={
            details[0]?.image && details[0]?.image.length > 0
              ? details[0].image
              : "https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
          }
        />
        <h1>{details[0]?.title}</h1>
        <h4>Ingredients: </h4>
        {details.length > 1 ? (
          details.map((detail) => {
            return (
              <>
                <li>
                  {detail.name} {detail.amount}
                </li>
                <button onClick={clickEdit}>EDIT</button>
              </>
            );
          })
        ) : (
          <h4>
            {details[0]?.name} {details[0]?.amount}
          </h4>
        )}
        <h4>Instructions: </h4>
        <h3>{details[0]?.instructions}</h3>
      </div>
    </>
  );
}
export default Details;
