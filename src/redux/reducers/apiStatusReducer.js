import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function endWithSuccess(input) {
  return input.substring(input.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(
  state = initialState.waitingApiRequest,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    endWithSuccess(action.type) ||
    action.type === types.API_CALL_ERROR
  ) {
    return state - 1;
  }
  return state;
}
