import * as constants from "../constants";
import axios from "../apis/index";
import { authChecker } from "../utils/authChecker";

export const login = (email, password) => async (dispatch) => {
  try {
    //2 actions - login success , login fail
    dispatch({ type: constants.LOGIN_REQUEST });
    const { data } = await axios.post("/user/login", { email, password });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: constants.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => {
  localStorage.removeItem("userInfo");
  return { type: constants.LOGOUT };
};

export const authStatusChecker = () => {
  const status = authChecker();
  return { type: constants.CHECK_AUTH_STATUS, payload: status };
};

export const register = (username, email, password, confirmpassword) => async (
  dispatch
) => {
  try {
    dispatch({ type: constants.SIGNUP_REQUEST });

    const { data } = await axios.post(
      "/user/register",
      {
        username,
        password,
        confirmPassword: confirmpassword,
        email,
      },
      { responseType: "json" }
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: constants.SIGNUP_SUCCESS, payload: data });
    dispatch({ type: constants.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
