import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getDetails() {
  try {
    console.log("Before");

    const recipeDetails = yield axios.get("/details");
    yield put({ type: "SET_DETAILS", payload: recipeDetails.data });
    console.log("after");
  } catch {
    console.log("get all error");
  }
}

function* fetchDetails() {
  yield takeEvery("FETCH_DETAILS", getDetails);
}

export default fetchDetails;
