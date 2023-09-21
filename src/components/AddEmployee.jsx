import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Employees from "./Employees";
import LoginContext from "./LoginContext";
import { useNavigate } from "react-router-dom";

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

const AddEmployee = () => {
  const [emplpyee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phNo: "",
    addedBy: "",
  });
  const [employees, setEmployees] = useState([]);
  const { profile } = useContext(LoginContext);
  const navigate = useNavigate();

  const addEmployeeRequest = (employee) => {
    axios
      .post("http://localhost:8082/addTenent-employee", employee, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((resp) => {
        if (resp.status == 200) {
          setEmployees(resp.data);
        }
      });
  };

  const getEmployee = async () => {
    await axios
      .get("http://localhost:8082/getEmployee", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((resp) => {
        setEmployees(resp?.data);
      });
  };

  useEffect(() => {
    setEmployee((prev) => ({ ...prev, addedBy: profile }));
    getEmployee();
  }, []);

  const addEmployee = (e) => {
    e.preventDefault();
    addEmployeeRequest(emplpyee);
  };

  return (
    <>
      <Grid
        component={"form"}
        sx={{ display: "flex", flexDirection: "column" }}
        p={2}
        container
        onSubmit={addEmployee}
      >
        <Grid
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onClick={() => navigate(-1)} variant="text" color="error">
            Go Back
          </Button>
          <Typography variant="h6" py={2}>
            Add Employee
          </Typography>
          <Grid sx={{ width: "10%" }} />
        </Grid>

        <TextField
          size="small"
          onChange={(e) =>
            setEmployee((prev) => ({ ...prev, firstName: e.target.value }))
          }
          variant="outlined"
          placeholder="First Name"
        />
        <TextField
          size="small"
          onChange={(e) =>
            setEmployee((prev) => ({ ...prev, lastName: e.target.value }))
          }
          variant="outlined"
          placeholder="Last Name"
        />
        <TextField
          size="small"
          onChange={(e) =>
            setEmployee((prev) => ({ ...prev, age: e.target.value }))
          }
          variant="outlined"
          placeholder="Age"
        />
        <TextField
          size="small"
          onChange={(e) =>
            setEmployee((prev) => ({ ...prev, phNo: e.target.value }))
          }
          variant="outlined"
          placeholder="Phone Number"
        />
        <Button variant="contained" type="submit" color="success">
          Add
        </Button>
      </Grid>
      <Grid container sx={{ my: "40px", border: "1px solid black" }}>
        <Employees employees={employees} />
      </Grid>
    </>
  );
};

export default AddEmployee;
