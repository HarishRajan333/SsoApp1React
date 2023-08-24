import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoginContext from "./LoginContext";

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};

const PlatformAdmin = () => {
  const [data, setData] = useState("");
  const { logout } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("http://localhost:8082/platformAdmin/getEms-data", {
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
      <button onClick={() => logout()}>log out</button>
    </>
  );
};

export default PlatformAdmin;
