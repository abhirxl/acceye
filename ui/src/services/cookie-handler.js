import Cookies from "js-cookie";

const setJwtInCookie = (token) => {
  Cookies.set("token", token);
};
const setNameInCookie = (userName) => {
  Cookies.set("user", userName);
};
const setroutePermissionInCookie = (value) => {
  Cookies.set("validUser", value);
};
export { setJwtInCookie, setNameInCookie, setroutePermissionInCookie };
