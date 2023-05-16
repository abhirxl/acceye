import LoginForm from "@components/TodoFiles/LoginForm";
import { Box } from "@mui/material";
import React from "react";

function login() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 10,
    p: 4,
  };
  return (
    <Box sx={style}>
      <LoginForm />
    </Box>
  );
}

export default login;
