import {
  DATA_POSTED,
  DATA_POSTED_ERROR_RESPONSE,
  DATA_POSTED_WITH_SUCCESS,
} from "./action.constant";
import { takeEvery, call, put } from "redux-saga/effects";
import { submitResume } from "../services/api-service";

function* watcherSaga() {
  yield takeEvery(DATA_POSTED, workerSaga);
}

function* workerSaga(action) {
  try {
    let response = yield call(submitResume, action.payload);
    put({ type: DATA_POSTED_WITH_SUCCESS, payload: response });
  } catch (err) {
    put({ type: DATA_POSTED_ERROR_RESPONSE, payload: err });
  }
}

export default watcherSaga;
