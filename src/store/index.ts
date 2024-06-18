import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/User.slice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {userSlice: userSlice.reducer},
    middleware: (gDM) => gDM().concat(sagaMiddleware)
  });
  

sagaMiddleware.run(rootSaga);

  
  export default store;