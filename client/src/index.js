import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import "materialize-css";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

String.prototype.reverse_string = function () {
  var s = "";
  var i = this.length;
  while (i > 0) {
    s += this.substring(i - 1, i);
    i--;
  }
  return s;
};
