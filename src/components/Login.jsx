import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import bgimg from "../images/bgimg.svg";
import { useNavigate } from "react-router-dom";
import LoginContext from "./LoginContext";
import axios from "axios";
import {
  deleteStorages,
  getExpiredTimeStamp,
  getRemainingMilliSeconds,
  setCookieWithTimestampExpiry,
} from "./KeycloakFunctions";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

let emsRoles = [
  "platformAdmin",
  "platformEmployee",
  "tenentAdmin",
  "tenentEmployee",
];

function Login({ children }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [roles, setroles] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  useEffect(() => {
    console.log(getRemainingMilliSeconds(cookies.get("atsRefreshExpires")) > 0);
    if (getRemainingMilliSeconds(cookies.get("atsRefreshExpires")) > 0) {
      let formData = new URLSearchParams();
      formData.append("client_id", "ats");
      formData.append("grant_type", "refresh_token");
      formData.append("refresh_token", cookies.get("atsRefreshToken"));
      console.log(formData.toString());
      axios
        .post(
          "http://localhost:8080/realms/bassure/protocol/openid-connect/token",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((resp) => {
          console.log(resp.data);
          if (resp.status == 200) {
            const checkRoles = emsRoles.some((r) =>
              jwtDecoder(
                resp.data?.access_token
              )?.resource_access?.ems?.roles?.includes(r)
            );
            if (checkRoles) {
              sessionStorage.setItem("accessToken", resp.data?.access_token);
              sessionStorage.setItem(
                "expiresIn",
                getExpiredTimeStamp(resp.data?.expires_in - 30)
              );
              cookies.set(
                "atsRefreshExpires",
                getExpiredTimeStamp(resp.data?.refresh_expires_in - 30),
                {
                  path: "/",
                }
              );
              cookies.set("atsRefreshToken", resp.data?.refresh_token, {
                path: "/",
              });
              setAuthenticated(true);
              mapRoles(resp.data?.access_token);
            }
          }
        });
    } else {
      window.location.href = "http://localhost:3000/auth/ems";
    }
  }, []);

  const autoLogOut = (remainingMilliSeconds) => {
    if (remainingMilliSeconds > 0) {
      setTimeout(() => {
        logout();
      }, remainingMilliSeconds);
    }
  };

  const logout = () => {
    deleteStorages();
    cookies.remove("atsRefreshExpires");
    cookies.remove("atsRefreshToken");
    setAuthenticated(false);
    window.location.href = "http://localhost:3000/auth/ems/logout";
  };

  const mapRoles = (token) => {
    setroles(jwtDecoder(token)?.resource_access?.ems?.roles);
  };

  const jwtDecoder = (token) => {
    try {
      return jwtDecode(token);
    } catch (Error) {
      alert("login failed");
    }
  };

  return !authenticated ? (
    <Box
      sx={{
        m: -1,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#1a237e",
      }}
    ></Box>
  ) : (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginContext.Provider value={{ roles, logout }}>
        {children}
      </LoginContext.Provider>
    </Box>
  );
}

export default Login;
