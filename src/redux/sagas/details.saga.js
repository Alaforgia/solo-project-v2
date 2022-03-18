import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getDetails() {
  try {
    console.log("Before");

    const recipes = yield axios.get("/details");
    yield put({ type: "SET_RECIPES", payload: recipes.data });
    console.log("after");
  } catch {
    console.log("get all error");
  }
}

function* fetchDetails() {
  yield takeEvery("FETCH_DETAILS", getDetails);
}

export default fetchDetails;
