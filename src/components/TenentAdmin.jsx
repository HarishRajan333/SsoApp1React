import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoginContext from "./LoginContext";
import AddEmployee from "./AddEmployee";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import View from "./ViewEmployee";

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

const TenentAdmin = () => {
  const [data, setData] = useState("");
  const { logout, profile } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/tenentAdmin/getEms-data", {
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
      <Button variant="contained" onClick={() => navigate("/add-employee")}>
        Add Employee
      </Button>
      <br />
      <br />
      <View />
      <br />
      <br />

      <button style={{ py: "20px" }} onClick={() => logout()}>
        log out
      </button>
    </>
  );
};

export default TenentAdmin;
