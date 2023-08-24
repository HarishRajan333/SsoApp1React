import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteStorages,
  getExpiredTimeStamp,
  setCookieWithTimestampExpiry,
} from "./components/KeycloakFunctions";
import Cookies from "universal-cookie";

const TokenSetter = () => {
  const { expiresIn, refreshToken } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const clearCookies = () => {
    cookies.remove("atsRefreshToken", { path: "/" });
    cookies.remove("atsRefreshExpires", { path: "/" });
  };

  const setCookies = () => {
    cookies.set("atsRefreshExpires", expiresIn, {
      path: "/",
    });
    cookies.set("atsRefreshToken", refreshToken, {
      path: "/",
    });
  };

  useEffect(() => {
    console.log(refreshToken + " " + expiresIn);
    clearCookies();
    setCookies();
    navigate("/");
  }, []);

  return <></>;
};

export default TokenSetter;
