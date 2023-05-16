import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { newUserRegistration } from "@services/todo-service";
import { Box, Button, Link, TextField, Stack, Typography } from "@mui/material";

export default function SignupForm() {
  const [emailError, setEmailError] = useState(" ")
  const style = {
    width: 380,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 10,
    p: 4,
  };

  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // post api call
  // send user data to databade from axios

  const userRegistration = (userData) => {
    newUserRegistration(userData)
      .then((responce) => {
        if (responce.status == true) {
          router.push("/todotask");
        } else if (responce.status == false) {
          errorHandler(responce.entity);
        }
      })
      .catch((error) => console.log("error in adding user", error));
  };

  const errorHandler = (data) => {
    switch (data) {
      case "email already added":
        setEmailError(data);
        break;
      default:
        console.log(data);
    }
  };

  return (
    <>
      <Box sx={style}>
        <form onSubmit={handleSubmit(userRegistration)}>
          <Stack spacing={.5} direction="column">
            <Typography variant="h2" pb={1} textAlign="center">
              Create Account
            </Typography>

            <TextField
              variant="outlined"
              helperText=" "
              id="newUserName"
              label="Name"
              {...register("name")}
            />
            <TextField
              variant="outlined"
              helperText={emailError}
              type="email"
              id="NewUserEmail"
              label="Email"
              {...register("email")}
            />
            <TextField
              variant="outlined"
              helperText=" "
              id="NewUserNumber"
              label="Number"
              {...register("number")}
            />

            <TextField
              variant="outlined"
              helperText=" "
              id="NewUserPassword"
              type="password"
              label="Password"
              {...register("password")}
            />
            <Stack py={1} spacing={1}>
              <Button
                sx={{ fontWeight: "bold", backgroundColor: "blue" }}
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign Up
              </Button>
            </Stack>

            <Typography textAlign="center">
              Already Have an Account ?
              <Link sx={{ cursor: "pointer" }}>
                <span onClick={() => router.push("/todotask")}>Sign in</span>
              </Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </>
  );
}
