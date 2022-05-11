import { combineReducers } from "redux";
import * as mainReducer from "./mainReducer";
import * as tronReducer from "./tronReducer";
import * as tronWebReducer from "./tronWebReducer";

export const rootReducer = combineReducers({
  ...mainReducer,
  ...tronReducer,
  ...tronWebReducer,
});
