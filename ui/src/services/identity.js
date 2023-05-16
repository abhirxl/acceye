import Cookies from "js-cookie";

const getAuth = () => {
  const token = Cookies.get("token");
  return token;
};

const getUserName = () => {
  const userName = Cookies.get("user");
  return userName;
};

export { getAuth, getUserName };
