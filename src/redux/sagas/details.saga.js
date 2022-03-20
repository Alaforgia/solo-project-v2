import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getDetails(action) {
  try {
    console.log("Before");
    console.log(`recipes/details/${action.payload}`);

    const recipeDetails = yield axios.get(`recipes/details/'${action.payload}'`);
    console.log(recipeDetails);

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
