import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Grid, Menu, MenuItem } from "@mui/material";
import profilePic from "../../images/profilepic.png";
import { Lock, Logout, Menu as MenuIcon } from "@mui/icons-material";
import logo from "../../images/logo_of_bassure.svg";
import CurrentUserContext from "../context/CurrentUserContext";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "#333333",
  color: "white",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  background: "#333333",
  color: "white",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "#1a237e",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const CustomDrawer = ({ pages }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openmenu = Boolean(anchorEl);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user } = React.useContext(CurrentUserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfile = () => {
    navigate("/Dashboard/Myprofile/"+user.id);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar>
          <Grid
            container
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
          >
            <Grid item>
              <Grid container display={"flex"} flexDirection={"row"}>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 5,
                      fontSize: "20px",
                      ...(open && { display: "none" }),
                    }}
                  >
                    <MenuIcon fontSize="20px" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6" fontFamily={"cursive"}>
                    Welcome To ATS
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <img src={logo} alt="logo" height={"30px"} width={"30px"} />
            </Grid>
            <Grid item pb={0.5}>
              <IconButton onClick={handleClick}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: "15px",
                    fontWeight: "bolder",
                  }}
                >
                  A
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openmenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleProfile}>
                  <ListItemIcon>
                    <Avatar
                      style={{
                        height: "25px",
                        width: "25px",
                        fontSize: "15px",
                        fontWeight: "bolder",
                      }}
                    >
                      A
                    </Avatar>
                  </ListItemIcon>
                  <Typography fontSize={"12px"}>My Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Lock sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography fontSize={"12px"}>Change Password</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="12px" />
                  </ListItemIcon>
                  <Typography fontSize={"12px"}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ bgcolor: "#1a237e" }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((page, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              component={Link}
              to={page.path}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  primary={page.title}
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "100%",
            py: 2,
            marginTop: theme.spacing(8) + 1,
            transition: theme.transitions.create(["margin", "height"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(open && {
              marginTop: theme.spacing(8) + 1,
              height: `calc(100% - ${theme.spacing(8) + 1}px)`,
              transition: theme.transitions.create(["margin", "height"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          }}
        >
          <div
            sx={{
              display: "flex",
              flexDirection: open ? "row" : "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: theme.spacing(1),
            }}
          >
            <Avatar sx={{ width: 35, height: 35, m: 1 }} src={profilePic} />
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                display={"none"}
                variant="subtitle1"
                sx={{ margin: "2px" }}
              >
                John Doe
              </Typography>
              <Typography variant="caption" color="White" textAlign={"justify"}>
                {user.role}
              </Typography>
            </Box>
          </div>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CustomDrawer;
