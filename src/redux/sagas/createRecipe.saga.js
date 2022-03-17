import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* postRecipe() {
  try {
    console.log("Before");
    // console.log(recipes.data);
    const recipes = yield axios.post("/recipes");
    console.log("get all:", recipes.data);
    yield put({ type: "GET_RECIPES", payload: action.payload });
    console.log("after");
  } catch {
    console.log("get all error");
  }
}

function* createRecipe() {
  yield takeLatest("CREATE_RECIPE", postRecipe);
}

export default createRecipe;
