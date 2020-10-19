import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import waitingApiRequest from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  waitingApiRequest,
});

export default rootReducer;
