import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import HomeLayout from "@layouts/HomeLayout";
import LoginForm from "@components/TodoFiles/LoginForm";

function Home() {
  const router = useRouter();
  return (
    <>
      <HomeLayout>
        <LoginForm/>
      </HomeLayout>
    </>
  );
}

export default Home;
