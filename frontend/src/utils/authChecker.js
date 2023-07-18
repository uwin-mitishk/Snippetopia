import jwtDecode from "jwt-decode";

export const authChecker = () => {
  const currentDate = new Date();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) return false;
  if (!userInfo.token) return false;
  const tokenInfo = jwtDecode(userInfo.token);
  if (tokenInfo.exp * 1000 > currentDate.getTime()) return true;
  else return false;
};
