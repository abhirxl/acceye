import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateTaskWithId } from "@services/todo-service";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  InputLabel,
  FormControl,
  NativeSelect,
} from "@mui/material";

export default function UpdateTask({ modalHandleClose, refresh, data }) {
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

  const oldData = {
    taskName: data.taskName,
    taskStatus: data.taskStatus,
    taskDiscription: data.taskDiscription,
  };
  const { register, handleSubmit } = useForm({
    defaultValues: oldData,
  });

  // update api call
  const updateTask = (taskDetail) => {
    updateTaskWithId(data.id, taskDetail)
      .then((responce) => {
        modalHandleClose();
        refresh();
      })
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
          Update task
        </Typography>
        <form onSubmit={handleSubmit(updateTask)}>
          <Stack spacing={4} direction="column" pt={5}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <TextField
                id="new_task"
                label="Task Name"
                variant="standard"
                {...register("taskName")}
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Task status
                  </InputLabel>
                  <NativeSelect
                    defaultValue={"notstart"}
                    {...register("taskStatus")}
                  >
                    <option value={"notstart"}>notstart</option>
                    <option value={"progress"}>process</option>
                    <option value={"complete"}>complete</option>
                  </NativeSelect>
                </FormControl>
              </Box>
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
                Update
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </>
  );
}
