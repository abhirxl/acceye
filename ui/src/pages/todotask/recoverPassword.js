import React, { useState } from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useForm } from "react-hook-form";
import { passwordFromDb } from "@services/todo-service";
import { useRouter } from "next/router";

function recoverPassword() {
  const router = useRouter()
  const { register, handleSubmit } = useForm();
  const [passwordValue, setPasswordValue] = useState(null);
  const [dbError, setDbError] = useState(" ");

  // api calling function
  const passwordRecoverHandler = (data) => {
    passwordFromDb(data).then((responce) => {
      if (responce.status == true) {
        setPasswordValue(responce.entity);
      } else if (responce.status == false) {
        setDbError(responce.entity);
      }
    });
  };

  return (
    <>
      <Stack justifyContent={"center"} direction={"row"} pt={5}>
        <Box
          sx={{
            width: "40rem",
            height: "25rem",
            border: "1px solid black",
          }}
        >
          <Stack>
            <Box>
              <Typography
                variant="h3"
                py={1}
                sx={{
                  textAlign: "center",
                  borderBottom: "1px solid black",
                }}
              >
                Password Recovery
              </Typography>
            </Box>
            <Stack height={"13rem"} px={2} justifyContent={"space-evenly"}>
              <form onSubmit={handleSubmit(passwordRecoverHandler)}>
                <Stack spacing={1} direction="row" p={1} border={"1px solid"}>
                  <Box sx={{ width: "25%" }}>
                    <Typography variant="h5">Email-id</Typography>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <TextField
                      required
                      id="userPassword"
                      type="email"
                      fullWidth
                      placeholder="sample@gmail.com"
                      variant="outlined"
                      {...register("recoveryEmail")}
                      helperText={dbError}
                    />
                  </Box>
                  <Box sx={{ width: "20%" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SearchIcon />}
                    >
                      find
                    </Button>
                  </Box>
                </Stack>

                <Stack spacing={1} direction="row" p={1} border={"1px solid"}>
                  <Box sx={{ width: "25%" }}>
                    <Typography variant="h5">Your password</Typography>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <TextField
                      id="userPassword"
                      fullWidth
                      value={passwordValue}
                      InputProps={{
                        readOnly: true,
                      }}
                      helperText=" "
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ width: "20%" }}>
                    <Button variant="contained" endIcon={<ContentCopyIcon />}>
                      copy
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Stack>

            <Stack direction={"row"} justifyContent={"center"} gap={4}>
              <Button onClick={()=> router.push("/")} variant="contained">Login</Button>
              <Button onClick={()=>router.push("/todotask/signup")} variant="contained">Signup</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default recoverPassword;
