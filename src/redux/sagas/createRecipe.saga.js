import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function * createRecipe() {
  try {
    console.log("Before");
    // console.log(recipes.data);
    const recipes = yield axios.post("/recipes");
    console.log("get all:", recipes.data);
    yield put({ type: "GET_RECIPES", payload: recipes.data });
    console.log("after");
  } catch {
    console.log("get all error");
  }

}


















export default createRecipe