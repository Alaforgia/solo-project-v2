import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import recipeGet from "../reducers/recipeGet.reducer";

function* fetchRecipes() {
  try {
    console.log("Before");
    console.log(recipes.data);
    // console.log("get all:", recipes.data);
    const recipes = yield axios.get("/recipes");
    yield put({ type: "SET_RECIPES", payload: recipes });
    console.log("after");
  } catch {
    console.log("get all error");
  }
}

export default fetchRecipes;
