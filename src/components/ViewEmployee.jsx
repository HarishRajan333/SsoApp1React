import axios from "axios";
import { useEffect, useState } from "react";
import Employees from "./Employees";

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

const View = () => {
  const [employees, setEmployees] = useState([]);

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
    getEmployee();
  }, []);

  return (
    <>
      <Employees employees={employees} />
    </>
  );
};

export default View;
<></>;
