import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getDetails(action) {
  try {
    console.log("Before");
    console.log(`recipes/details/${parseInt(action.payload)}`);

    const recipeDetails = yield axios.get(`recipes/details/${parseInt(action.payload)}`);
    console.log("recipe details =", recipeDetails);

    // yield put({ type: "RESET_DETAILS" });
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
