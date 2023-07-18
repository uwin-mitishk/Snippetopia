import { combineReducers } from "redux";
import postReducer from "./post";
import { loginReducer, registerReducer } from "./user";
const rootReducer = combineReducers({
  post: postReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
});

export default rootReducer;
