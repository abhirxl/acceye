import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Box>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Typography
                sx={{ width: "100%", textAlign: "center" }}
                variant="h2"
              >
                TODO TASKS
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box height={"80vh"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box bgcolor={"cyan"} flexGrow={1} height={"90vh"}>
              <Stack
                justifyContent={"center"}
                gap={2}
                alignItems={"center"}
                sx={{ height: "80vh" }}
              >
                <Box pr={10}>
                  <Typography
                    fontSize={"5rem"}
                    fontWeight={"1rem"}
                    component={"span"}
                  >
                    A Simple Project
                  </Typography>
                </Box>
                <Box pl={10}>
                  <Typography fontSize={"4rem"} component={"span"}>
                    Based on CRUD api
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box
              bgcolor={"#0ffaea"}
              sx={{ paddingX: "2rem", paddingTop: "4rem" }}
              height={"90vh"}
            >
              {children}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default HomeLayout;
