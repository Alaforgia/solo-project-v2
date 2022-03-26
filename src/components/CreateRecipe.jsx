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
    // console.log("remove row clicked", index);

    const updatedIngredientsArray = ingredients.filter((ingredient, i) => index !== i);
    setIngredients(() => [...updatedIngredientsArray]);
    // console.log("ingredients: ", ingredients);

    const updatedAmountsArray = amounts.filter((amount, i) => index !== i);
    setAmounts(() => [...updatedAmountsArray]);
    // console.log("amounts: ", amounts);
  };

  const handleSubmit = (event, action) => {
    event.preventDefault();

    let formData = {
      title: title,
      instructions: instructions,
      ingredients: ingredients,
      amounts: amounts,
    };
    // console.log("formData = ", formData);
    dispatch({
      type: "ADD_RECIPE",
      payload: { formData },
    });
    // history.push('/details');
    // /${id}
  };

  // const handleClick = (createClicked) => {
  //   dispatch({ type: "ADD_RECIPE", payload: createClicked });
  // };

  return (
    <>
      <h2 className="text-center mb-8 text-5xl font-bold">Create Recipe</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center max-w-md mx-auto rounded-lg mb-8"
      >
        <input
          className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
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
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              value={ingredient.name}
              onChange={handleIngredientNameChange(index)}
            />
            <input
              type="text"
              placeholder="Amount"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              value={amounts[index].name}
              onChange={handleAmountNameChange(index)}
            />
            <button type="button" onClick={() => handleRemoveRow(index)} className="small">
              <FontAwesomeIcon icon={faCircleMinus} className="h-6 ml-[7px]" />
            </button>
          </div>
        ))}
        <div className="w-full flex flex-row align-center justify-end">
          <button type="button" onClick={handleAddRow} className="small mb-10 mr-[0.2px]">
            <FontAwesomeIcon icon={faCirclePlus} className="h-6" />
          </button>
        </div>

        <textarea
          className="w-full px-4 py-1 text-gray-800 rounded-9 focus:outline-none mx-auto mb-8"
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
    </>
  );
};

export default CreateRecipeForm;
