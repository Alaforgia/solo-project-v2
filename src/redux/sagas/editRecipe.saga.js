import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* putNewRecipe(action) {
  // console.log("action.paayload is =", action.payload);
  try {
    // console.log("Before PUT SAGA");
    // console.log(`recipes/details/${action.payload}`);

    const recipeUpdate = yield axios.put(`recipes/edit/${action.payload.id}`, action.payload);
    // yield put({ type: "SET_EDIT_ITEM", payload: recipeUpdate.data });
    // console.log("After PUT SAGA");
  } catch {
    // console.log("get all error");
  }
}

function* updateRecipe() {
  yield takeEvery("UPDATE_RECIPE", putNewRecipe);
}

export default updateRecipe;
