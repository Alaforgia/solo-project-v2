import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* deleteRecipe(action) {
  try {
    console.log("action payload:", action.payload);
    yield axios.delete(`recipes/delete/${parseInt(action.payload.id)}`);
  } catch {
    console.log("get all error");
  }
}

function* deleteHandler() {
  yield takeEvery("DELETE_RECIPE", deleteRecipe);
}

export default deleteHandler;
