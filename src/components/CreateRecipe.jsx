import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const CreateRecipeForm = () => {
  const [ingredients, setIngredients] = useState([{ name: "" }]);
  const [amounts, setAmounts] = useState([{ name: "" }]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "CREATE_RECIPE",
    });
  };

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
          onChange={(event) => setInstruction(event.target.value)}
          type="text"
          placeholder="Description"
        />

        <button
          type="submit"
          className="button-max-width font-semibold hover:text-[#171515] hover:bg-[#f6f9f0] 
          hover:border-[#171515] py-2 px-7 border border-[#171515] bg-[#171515] text-[#f6f9f0] rounded-full 
          transition mb-9 w-160 md:w-160 xl:w-160"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default CreateRecipeForm;
