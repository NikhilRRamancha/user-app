import { all, fork } from "redux-saga/effects";
import { watchGetUser } from "./user/User.saga";

const rootSaga = function* () {
  yield all([
    fork(watchGetUser),
    // Other forks
  ]);
};

export default rootSaga;
