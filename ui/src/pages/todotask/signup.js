import React from "react";
import SignupForm from "@components/TodoFiles/SignupForm";
import HomeLayout from "@layouts/HomeLayout";

function signup() {
  return (
    <>
      <HomeLayout>
        <SignupForm />
      </HomeLayout>
    </>
  );
}

export default signup;
