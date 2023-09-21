import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Box } from "@mui/system";
import LoginContext from "../LoginContext";
import PlatformAdmin from "../PlatformAdmin";
import PlatformEmployee from "../PlatformEmployee";
import TenentAdmin from "../TenentAdmin";
import TenentEmployee from "../TenentEmployee";
import AddEmployee from "../AddEmployee";

// const hrPages = [
//   { title: "Dashboard", path: "/Dashboard", icon: <QueryStatsIcon /> },
//   {
//     title: "Posted Jobs",
//     path: "/Dashboard/posted-jobs",
//     icon: <ViewTimelineIcon />,
//   },
//   {
//     title: "Scheduled Interviews",
//     path: "/Dashboard/viewInterviewStatus/0",
//     icon: <AssignmentOutlinedIcon />,
//   },
//   {
//     title: "Scheduled All",
//     path: "/Dashboard/view-all-interviews",
//     icon: <EventAvailableOutlinedIcon />,
//   },
//   {
//     title: "Recuriters",
//     path: "/Dashboard/recruiters",
//     icon: <EventAvailableOutlinedIcon />,
//   },
// ];

// const recruiterPages = [
//   {
//     title: "Dashboard",
//     path: "/Dashboard",
//     icon: <QueryStatsIcon />,
//   },
//   {
//     title: "Candidates",
//     path: "/Dashboard/Candidates",
//     icon: <PeopleAltOutlinedIcon />,
//   },
//   {
//     title: "Assigned Tasks",
//     path: "/Dashboard/assignedTasks/57",
//     icon: <AssignmentOutlinedIcon />,
//   },
//   {
//     title: "Scheduled Interviews",
//     path: "/Dashboard/scheduled-interviews/57",
//     icon: <EventAvailableOutlinedIcon />,
//   },
// ];

export default function Dashboard() {
  const { roles } = useContext(LoginContext);

  useEffect(() => {
    console.log(roles);
  }, []);

  return (
    <>
      {/* <CustomDrawer
        pages={user.role === "hr_manager" ? hrPages : recruiterPages}
      /> */}
      <Box sx={{ mt: 5, ml: 8 }}>
        {roles.includes("platformAdmin") && (
          <Routes>
            <Route path="" element={<PlatformAdmin />} />
          </Routes>
        )}
        {roles.includes("platformEmployee") && (
          <Routes>
            <Route path="" element={<PlatformEmployee />} />
          </Routes>
        )}
        {roles.includes("tenentAdmin") && (
          <Routes>
            <Route path="" element={<TenentAdmin />} />
            <Route path="add-employee" element={<AddEmployee />} />
          </Routes>
        )}
        {roles.includes("tenentEmployee") && (
          <Routes>
            <Route path="" element={<TenentEmployee />} />
          </Routes>
        )}
      </Box>
    </>
  );
}
