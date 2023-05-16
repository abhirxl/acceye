import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  setJwtInCookie,
  setNameInCookie,
  setroutePermissionInCookie,
} from "../../services/cookie-handler";

import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { userLogin } from "@services/todo-service";

// ////////////////////////////////////////////////////////
export default function LoginForm() {
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const style = {
    width: 380,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 10,
    p: 4,
  };

  // send data and login and get Token
  const loginHandler = (formDetail) => {
    userLogin(formDetail)
      .then((responce) => {
        if (responce.status == true) {
          setJwtInCookie(responce.entity.token);
          setNameInCookie(responce.entity.name);
          setroutePermissionInCookie(true);
          router.push("/todotask/task");
        } else if (responce.status == false) {
          errorHandler(responce.entity);
        }
      })
      .catch((err) => console.log(err));
  };

  const errorHandler = (data) => {
    switch (data) {
      case "Invalid email":
        setEmailError(data);
        setPasswordError(" ");
        break;
      case "Incorrect password":
        setPasswordError(data);
        setEmailError(" ");
        break;
      default:
        console.log(data);
    }
  };

  const forgotPasswordHandler = () => {
    router.push("todotask/recoverPassword");
  };

  return (
    <>
      <Box sx={style}>
        <form onSubmit={handleSubmit(loginHandler)}>
          <Stack spacing={1} direction="column">
            <Typography variant="h2" textAlign="center" pb={1}>
              Log in
            </Typography>

            <TextField
              type="email"
              id="userEmail"
              label="Email"
              placeholder="sample@gmail.com"
              {...register("email")}
              // error
              variant="outlined"
              helperText={emailError}
            />

            <TextField
              id="userPassword"
              type="password"
              label="password"
              // placeholder="Password"
              {...register("password")}
              variant="outlined"
              helperText={passwordError}
            />
            <Stack spacing={1}>
              <Button
                sx={{ fontWeight: "bold", backgroundColor: "blue" }}
                type="submit"
                fullWidth
                variant="contained"
              >
                Log in
              </Button>
              <Link sx={{cursor:"pointer"}} underline="hover" textAlign="center">
                <span onClick={forgotPasswordHandler}>Forgot Password?</span>
              </Link>
            </Stack>

            <Typography textAlign="center">
              Not A Member ?
              <Link sx={{ cursor: "pointer" }}>
                <span onClick={() => router.push("/todotask/signup")}>
                  Create Account
                </span>
              </Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </>
  );
}
