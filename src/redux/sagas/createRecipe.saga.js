import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* postRecipe(action) {
  try {
    // console.log(recipes.data);
    console.log("Before /recipes");
    console.log("action.payload =", action.payload);
    yield axios.post("/recipes/recipes", action.payload);
    // console.log("get all:", recipes.data);
    yield put({ type: "FETCH_RECIPES" });
    console.log("After /recipes");
    // const recipes =
    // , payload: recipes.value
    yield axios.post("/recipes/ingredients", action.payload);
    yield put({ type: "FETCH_RECIPES", payload: action.payload });
    console.log("after /ingredients");
  } catch {
    console.log("get all error");
  }
}

function* addRecipe() {
  yield takeEvery("ADD_RECIPE", postRecipe);
}

export default addRecipe;
