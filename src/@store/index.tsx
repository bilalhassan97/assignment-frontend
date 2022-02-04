import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [];
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}
const store: any = createStore(rootReducer, bindMiddleware([...middlewares]));
store.sagaTask = sagaMiddleware.run(rootSaga);

export default store;
