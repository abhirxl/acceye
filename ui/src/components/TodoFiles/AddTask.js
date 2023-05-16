import React from "react";
import { Box, Button, TextField, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { createNewTask } from "@services/todo-service";

export default function AddTask({ modalHandleClose, refreshTaskData }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 430,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { register, handleSubmit } = useForm();

  // post api call
  const createTask = (taskDetail) => {
    createNewTask(taskDetail)
      .then((responce) => {
        console.log(responce);
        modalHandleClose();
        refreshTaskData();
        // refresh(responce)
      })
      // .then(modalHandleClose)
      // .then(refresh)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box sx={style}>
        <Typography
          variant="h4"
          textAlign="center"
          textTransform="uppercase"
          py={1}
          boxShadow={1}
          mb={2}
        >
          add a new task
        </Typography>
        <form onSubmit={handleSubmit(createTask)}>
          <Stack spacing={4} direction="column" pt={5}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <TextField
                id="new_task"
                label="Task Name"
                variant="standard"
                {...register("taskName")}
              />
            </Stack>
            <Stack>
              <TextField
                id="new_task_discription"
                label="Task Discription"
                multiline
                maxRows={2}
                variant="standard"
                {...register("taskDiscription")}
              />
            </Stack>
            <Stack direction="row" spacing={4} justifyContent="flex-end">
              <Button type="reset" variant="outlined" color="warning">
                Reset
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="error"
                onClick={modalHandleClose}
              >
                Cancel
              </Button>

              <Button type="submit" variant="outlined" color="primary">
                Add
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </>
  );
}
