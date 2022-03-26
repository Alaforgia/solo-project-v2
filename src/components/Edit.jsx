import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

function Edit() {
  const details = useSelector((store) => store.findDetails);
  const [ingredients, setIngredients] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [title, setTitle] = useState(details[0].title);
  const [instructions, setInstructions] = useState(details[0].instructions);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!ingredients.length > 0) {
      parseIngredients();
    }
  }, []);

  const parseIngredients = () => {
    details.forEach((detail) => {
      setIngredients((ingredients) => [...ingredients, detail.name]);
      setAmounts((amounts) => [...amounts, detail.amount]);
    });
  };

  // // console.log(title);
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
    // // console.log("remove row clicked", index);

    const updatedIngredientsArray = ingredients.filter((ingredient, i) => index !== i);
    setIngredients(() => [...updatedIngredientsArray]);
    // // console.log("ingredients: ", ingredients);

    const updatedAmountsArray = amounts.filter((amount, i) => index !== i);
    setAmounts(() => [...updatedAmountsArray]);
    // // console.log("amounts: ", amounts);
  };
  // const { id } = useParams();

  const handleUpdateRecipe = () => {
    let formData = {
      title: title,
      instructions: instructions,
      ingredients: ingredients,
      amounts: amounts,
      image:
        "https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png",
    };

    // // console.log("form data: ", formData);
    dispatch({ type: "UPDATE_RECIPE", payload: { formData: formData, id: id } });
    // // console.log("formData = ", formData);
    setIsFormSubmit(true);
  };
  return (
    <div className="">
      {isFormSubmit === false ? (
        <>
          <form
            // onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center max-w-md mx-auto rounded-lg mb-8 px-4"
          >
            <label htmlFor="recipe-title" className="text-left w-full pl-4">
              Recipe Title
            </label>
            <input
              className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none"
              onChange={(event) => setTitle(event.target.value)}
              id="recipe-title"
              type="text"
              // defaultValue={details[0]?.title}
              value={title}
              placeholder="Title"
            />
            {ingredients.map((ingredient, index) => (
              <div className="flex flex-row" key={index}>
                <div className="input-group flex flex-col justify-center items-center ">
                  <label htmlFor={`ingredient-${index}`} className="text-left w-full pl-4">
                    Ingredient
                  </label>
                  <input
                    type="text"
                    placeholder="Ingredient"
                    className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none shadow-md"
                    id={`ingredient-${index}`}
                    // defaultValue={ingredient}
                    value={ingredient}
                    onChange={handleIngredientNameChange(index)}
                  />
                </div>
                <div className="input-group flex flex-col justify-center items-center px-4">
                  <label htmlFor={`amount-${index}`} className="text-left w-full pl-4">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Amount"
                    className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none shadow-md"
                    id={`amount-${index}`}
                    // defaultValue={amounts[index]}
                    value={amounts[index]}
                    onChange={handleAmountNameChange(index)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveRow(index)}
                  className="small pl-[12px] pt-[24px] min-w-[36px]"
                >
                  <FontAwesomeIcon icon={faCircleMinus} className="h-6" />
                </button>
              </div>
            ))}
            <div className="w-full flex flex-row align-center justify-end">
              <button type="button" onClick={handleAddRow} className="small pt-3 mb-10">
                <FontAwesomeIcon icon={faCirclePlus} className="h-6" />
              </button>
            </div>
            <label htmlFor="instructions" className="text-left w-full pl-md-4">
              Instructions
            </label>
            <textarea
              className="w-full px-4 py-1 text-gray-800 rounded-9 focus:outline-none mx-auto mb-8"
              onChange={(event) => setInstructions(event.target.value)}
              type="text"
              id="instructions"
              value={instructions}
              // defaultValue={details[0]?.instructions}
              placeholder="Description"
            />
          </form>
          <div className="flex flex-col justify-center items-center max-w-md mx-auto mb-8">
            <button className="button mx-0" onClick={handleUpdateRecipe}>
              UPDATE
            </button>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-row items-center justify-center">
          <div className="card-shadow py-5 px-8 flex flex-col items-center justify-center">
            <h2 className="mb-4">Your recipe has been updated!</h2>
            <Link className="button" to="/">
              View My Recipes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;
