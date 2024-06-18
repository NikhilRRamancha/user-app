import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { GET_USERS } from "./User.types";
import { fetchUsersSuccess, fetchUsersFailure } from "./User.slice";

export function* getUserSaga() {
    try {
        const response: AxiosResponse<{data: {users: User.IUser[]}}> = yield axios.get(`https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users`);
        yield put(fetchUsersSuccess(response.data.data.users));
    } catch (error) {
        yield put(fetchUsersFailure());
    }
}

export function* watchGetUser() {
    yield takeLatest(GET_USERS, getUserSaga);
}