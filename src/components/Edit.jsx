import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function Edit() {
  const details = useSelector((store) => store.findDetails);

  const dispatch = useDispatch();
  // const { id } = useParams();
  // useEffect(() => {
  //   dispatch({ type: "FETCH_DETAILS", payload: id });
  // }, []);

  const [ingredients, setIngredients] = useState([{ name: "" }]);
  const [amounts, setAmounts] = useState([{ name: "" }]);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");

  // console.log(title);
  const handleIngredientNameChange = (index) => (event) => {
    const newIngredientsArray = ingredients.map((ingredient, i) => {
      if (index !== i) return ingredient;
      return { ...ingredient, name: event.target.value };
    });

    setIngredients(() => [...newIngredientsArray]);
  };
  const handleAmountNameChange = (index) => (event) => {
    const newAmountsArray = amounts.map((amount, i) => {
      if (index !== i) return amount;
      return { ...amount, name: event.target.value };
    });

    setAmounts(() => [...newAmountsArray]);
  };

  const handleAddRow = () => {
    handleAddIngredient();
    handleAddAmount();
  };

  const handleAddIngredient = () => {
    setIngredients(() => [
      ...ingredients,
      {
        name: "",
      },
    ]);
  };
  const handleAddAmount = () => {
    setAmounts(() => [
      ...amounts,
      {
        name: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    console.log("remove row clicked", index);

    const updatedIngredientsArray = ingredients.filter((ingredient, i) => index !== i);
    setIngredients(() => [...updatedIngredientsArray]);
    console.log("ingredients: ", ingredients);

    const updatedAmountsArray = amounts.filter((amount, i) => index !== i);
    setAmounts(() => [...updatedAmountsArray]);
    console.log("amounts: ", amounts);
  };

  const handleUpdateRecipe = () => {
    let formData = {
      title: title,
      instructions: instructions,
      ingredients: ingredients,
      amounts: amounts,
    };

    dispatch({ type: "UPDATE_RECIPE", payload: { formData } });
  };

  return (
    <>
      <div>THIS IS THE EDIT VIEW</div>
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center max-w-md mx-auto rounded-lg mb-8"
      >
        <input
          className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          defaultValue={details[0]?.title}
          placeholder="Title"
        />
        {ingredients.map((ingredient, index) => (
          <div className="flex flex-row" key={index}>
            <input
              type="text"
              placeholder="Ingredient"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              // value={ingredient.name}
              defaultValue={details[0]?.name}
              onChange={handleIngredientNameChange(index)}
            />
            <input
              type="text"
              placeholder="Amount"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              // value={amounts[index].name}
              defaultValue={details[0]?.amount}
              onChange={handleAmountNameChange(index)}
            />
            <button type="button" onClick={() => handleRemoveRow(index)} className="small">
              <FontAwesomeIcon icon={faCircleMinus} className="h-6" />
            </button>
          </div>
        ))}
        <div className="w-full flex flex-row align-center justify-end">
          <button type="button" onClick={handleAddRow} className="small mb-10 mr-[2.1px]">
            <FontAwesomeIcon icon={faCirclePlus} className="h-6" />
          </button>
        </div>

        <textarea
          className="w-full px-4 py-1 text-gray-800 rounded-9 focus:outline-none mx-auto mb-8"
          onChange={(event) => setInstructions(event.target.value)}
          type="text"
          // value={instructions}
          defaultValue={details[0]?.instructions}
          placeholder="Description"
        />
      </form>

      {/* <div>
        <img
          src={
            details[0]?.image && details[0]?.image.length > 0
              ? details[0].image
              : "https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
          }
        />
        <input defaultValue={details[0]?.title}></input>
        <input>Ingredients: </input>
        {details.length > 1 ? (
          details.map((detail) => {
            return (
              <input>
                {detail.name} {detail.amount}
              </input>
            );
          })
        ) : (
          <input>
            {details[0]?.name} {details[0]?.amount}
          </input>
        )}
        <input>Instructions: </input>
        <input>{details[0]?.instructions}</input>
      </div> */}
      <button onClick={handleUpdateRecipe}>UPDATE</button>
    </>
  );
}

export default Edit;
