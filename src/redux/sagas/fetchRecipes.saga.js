import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";
import recipeGet from "../reducers/recipeGet.reducer";

function* getRecipes() {
  try {
    console.log("Before");
    // console.log(recipes.data);
    // console.log("get all:", recipes.data);
    const recipes = yield axios.get("/recipes");
    yield put({ type: "SET_RECIPES", payload: recipes.data });
    console.log("after");
  } catch {
    console.log("get all error");
  }
}

function* fetchRecipes() {
  yield takeEvery("FETCH_RECIPES", getRecipes);
}

export default fetchRecipes;
