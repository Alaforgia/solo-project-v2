import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* postRecipe(action) {
  try {
    // console.log(recipes.data);
    console.log("Before /recipes", recipes);
    const recipes = yield axios.post("/recipes/recipes", action.payload);
    // console.log("get all:", recipes.data);
    // yield put({ type: "CREATE_RECIPES", payload: action.payload });
    console.log("After /recipes");
    // const ingredients = yield axios.post("/recipes/ingredients");
    // console.log("Ingredients: ", ingredients);
    // yield put({ type: "CREATE_RECIPES", payload: action.payload });
    // console.log("after /ingredients");
  } catch {
    console.log("get all error");
  }
}

function* addRecipe() {
  yield takeEvery("ADD_RECIPE", postRecipe);
}

export default addRecipe;
