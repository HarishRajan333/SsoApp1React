import { useContext, useEffect, useState } from "react";
import LoginContext from "./LoginContext";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Employees = (employees) => {
  useEffect(() => {}, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h5" sx={{ py: "20px" }}>
          Employees List
        </Typography>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Firts Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Phone No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.employees?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.firstName}
                </TableCell>
                <TableCell align="right">{row?.lastName}</TableCell>
                <TableCell align="right">{row?.age}</TableCell>
                <TableCell align="right">{row?.phNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Employees;
