import { useContext, useEffect, useState } from "react";
import LoginContext from "./LoginContext";
import axios from "axios";
import View from "./ViewEmployee";
import { Typography } from "@mui/material";

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

const TenentEmployee = () => {
  const [data, setData] = useState("");
  const { logout, profile } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("http://localhost:8082/tenentEmployee/getEms-data", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((resp) => {
        if (resp.status == 200) {
          setData(resp.data);
        }
      });
  }, []);

  return (
    <>
      <h1>{data}</h1>
      <Typography>{`name - ${profile}`}</Typography>
      <br />
      <br />
      <View />
      <br />
      <br />
      <button onClick={() => logout()}>log out</button>
    </>
  );
};

export default TenentEmployee;
