import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";
import {
  setCurrentUser,
  scheduleRenewingTokens,
  getCurrentProfile
} from "./store/actions";
import jwt_decode from "jwt-decode";
import { setAuthReqHeader } from "./custom-axios";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//Refresh page handling
if (localStorage.getItem("accessToken")) {
  setAuthReqHeader(localStorage.getItem("accessToken"));
  const authData = jwt_decode(localStorage.getItem("accessToken"));
  store.dispatch(setCurrentUser(authData));
  store.dispatch(getCurrentProfile());
  const currentTime = Date.now() / 1000;
  if (authData.exp < currentTime) {
    store.dispatch(scheduleRenewingTokens(authData._id, authData.exp));
  }
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
