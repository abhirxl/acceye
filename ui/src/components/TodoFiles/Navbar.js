import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getUserName } from "@services/identity";

import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Logout, Settings } from "@mui/icons-material";

export default function Navbar() {
  const Username = getUserName() || "User";
  const name = Username.charAt(0).toUpperCase() + Username.slice(1);
  const nameFirstLatter = name.charAt(0).toUpperCase();

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const NavbarIcon = styled("IconButton")(({ theme }) => ({ color: "white" }));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("validUser");
    router.push("/todotask");
    // console.log("logout click");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <NavbarIcon>
          <MenuIcon sx={{ fontSize: "2rem" }} />
        </NavbarIcon>
        <Typography sx={{ width: "100%", textAlign: "center" }} variant="h2">
          TODO TASKS
        </Typography>

        <Tooltip title={`${name} Account`}>
        {/* <Tooltip title={`Account info`}> */}
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* profile pic */}
            <Avatar sx={{ height: 35, width: 35 }}>{nameFirstLatter}</Avatar>
            {/* <Avatar sx={{ height: 35, width: 35 }}>A</Avatar> */}
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          // onClick={handleClose}
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
          <MenuItem>
            {/* icon and user name from database */}
            {/* <Avatar>A</Avatar> Abhishek */}
            <Avatar>{nameFirstLatter}</Avatar> {name}
          </MenuItem>
          <Divider />

          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => logoutHandler()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
