import { Legend, Line, LineChart, Pie, PieChart, Tooltip } from "recharts";
import { Grid, Paper } from "@mui/material";
import React from "react";
import { lightencolor } from "../home/Home";

const lineChartData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];
const pieChartData = [
  { name: "Completed tasks", value: 25 },
  { name: "Hired Candidates", value: 50 },
  { name: "Pending postings", value: 75 },
];

function VisualizedData() {
  return (
    <Grid
      item
      container
      paddingX={6}
      spacing={1}
      display={"flex"}
      justifyContent={"space-around"}
    >
      <Grid item lg={6} md={3} sm={6} xs={6} component={Paper} elevation={2}>
        <LineChart width={600} height={300} data={lineChartData}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
        </LineChart>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={6} component={Paper} elevation={2}>
        <PieChart width={400} height={300}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={lightencolor("#04297A", 20)}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </Grid>
    </Grid>
  );
}

export default VisualizedData;
