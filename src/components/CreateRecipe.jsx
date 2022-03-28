import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link, useHistory } from "react-router-dom";

const CreateRecipeForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [ingredients, setIngredients] = useState([{ name: "" }]);
  const [amounts, setAmounts] = useState([{ name: "" }]);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");

  // useState is storing data locally

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

  // Above, these functions handle the ingredient and amount input changes, even when multiple forms are added on the DOM.

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

  // This handles the addition of new row inputs of ingredients and amounts
  //Below, This handles the removal of input fields on the DOM.

  const handleRemoveRow = (index) => {
    // console.log("remove row clicked", index);

    const updatedIngredientsArray = ingredients.filter((ingredient, i) => index !== i);
    setIngredients(() => [...updatedIngredientsArray]);
    // console.log("ingredients: ", ingredients);

    const updatedAmountsArray = amounts.filter((amount, i) => index !== i);
    setAmounts(() => [...updatedAmountsArray]);
    // console.log("amounts: ", amounts);
  };

  // Below, Handles the "Create" button and posts the new recipe data to the DB. formData is held in the client
  // and then dispatched to the ADD_RECIPE saga to communicate with the backend POST.

  const handleSubmit = (event, action) => {
    event.preventDefault();

    let formData = {
      title: title,
      instructions: instructions,
      ingredients: ingredients,
      amounts: amounts,
    };
    console.log(id);
    dispatch({
      type: "ADD_RECIPE",
      payload: { formData },
    });
    history.push(`/`);
  };

  return (
    <div className="">
      <h2 className="text-center mb-8 text-4xl font-bold">Create Recipe</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center max-w-md mx-auto rounded-lg mb-8 px-4"
      >
        <input
          className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none shadow-md"
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          value={title}
          placeholder="Title"
        />
        {ingredients.map((ingredient, index) => (
          <div className="flex flex-row" key={index}>
            <input
              type="text"
              placeholder="Ingredient"
              className="w-full px-4 py-1 ml-0 text-gray-800 rounded-lg focus:outline-none shadow-md"
              value={ingredient.name}
              onChange={handleIngredientNameChange(index)}
            />
            <input
              type="text"
              placeholder="Amount"
              className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none shadow-md"
              value={amounts[index].name}
              onChange={handleAmountNameChange(index)}
            />
            {/* Font Awesome library used for my button styles. */}
            <button type="button" onClick={() => handleRemoveRow(index)} className="small min-w-[31px]">
              <FontAwesomeIcon icon={faCircleMinus} className="h-6 ml-[7px]  shadow-md rounded-full" />
            </button>
          </div>
        ))}
        <div className="w-full flex flex-row align-center justify-end">
          <button type="button" onClick={handleAddRow} className="small mb-10 mr-[0.2px]">
            <FontAwesomeIcon icon={faCirclePlus} className="h-6  shadow-md rounded-full" />
          </button>
        </div>

        {/* Tailwindcss is used in most of the styling in my app */}

        <textarea
          className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none mx-auto mb-8 shadow-md whitespace-pre-line"
          onChange={(event) => setInstructions(event.target.value)}
          type="text"
          value={instructions}
          placeholder="Description"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          // onClick={handleClick}
          className="button"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRecipeForm;
