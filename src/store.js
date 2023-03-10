import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { newsListReducer } from "./reducers/newsListReducers";
import { kidsListReducer } from "./reducers/kidsListReducers";

let rootReducer = combineReducers({
  newsListState: newsListReducer,
  kidsListState: kidsListReducer,
});

const initialState = {
  newsListState: {},
  kidsListState: {},
};

const middleware = [thunk];

let store = createStore(
  rootReducer,
  initialState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
