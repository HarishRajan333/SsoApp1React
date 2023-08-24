import logo from "./logo.svg";
import "./App.css";
import LoginContext from "./components/LoginContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import TokenSetter from "./TokenSetter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <Login>
                <Dashboard />
              </Login>
            }
          />
          <Route path="/setAuth/:refreshToken/:expiresIn" element={<TokenSetter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
