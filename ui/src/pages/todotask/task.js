import React, { useState, useEffect } from "react";
import Navbar from "@components/TodoFiles/Navbar";
import { deleteTaskWithId, getAllTasks } from "@services/todo-service";
import AddTask from "@components/TodoFiles/AddTask";
import UpdateTask from "@components/TodoFiles/Updatetask";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Modal,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

export default function dashboard() {
  const [addTaskModalOpen, setaddTaskModalOpen] = useState(false);
  const [updateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [tabValue, setTabValue] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  let taskDataForMap = [];
  const [refreshtask, setRefreshtask] = useState(true);

  if (tabValue === "all") {
    taskDataForMap = allTasks;
  } else if (tabValue === "progress") {
    taskDataForMap = allTasks.filter((data) => data.taskStatus == "progress");
  } else if (tabValue === "complete") {
    taskDataForMap = allTasks.filter((data) => data.taskStatus == "complete");
  } else if (tabValue === "notStart") {
    taskDataForMap = allTasks.filter((data) => data.taskStatus == "notstart");
  }

  const modalHandleClose = () => {
    setUpdateTaskModalOpen(false);
    setaddTaskModalOpen(false);
  };

  const updateTask = (data) => {
    setUpdateModalData(data);
    setUpdateTaskModalOpen(true);
  };

  const tabHandleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const accrodianHandleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const refreshTaskData = (data) => {
    // setAllTasks([...allTasks, data]);
    setRefreshtask(refreshtask ? false : true), setExpanded(false);
  };

  // api call for all task data from database(sql by sequlize)
  // api call for all task data from database(sql by sequlize)
  useEffect(() => {
    getAllTasks().then(
      (responce) => (
        setAllTasks(responce), console.log("task data form sequlize", responce)
      )
    );
  }, [refreshtask]);

  // setUserData

  return (
    <>
      <Navbar />

      <Box sx={{ width: "100%" }}>
        <Tabs
          sx={{ paddingTop: "1rem" }}
          value={tabValue}
          onChange={tabHandleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value="all" label="All tasks" />
          <Tab value="progress" label="Progress" />
          <Tab value="complete" label="Completed" />
          <Tab value="notStart" label="Not start" />
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => setaddTaskModalOpen(true)}
            >
              New Task
            </Button>
          </Stack>
        </Tabs>

        <Modal
          open={addTaskModalOpen}
          onClose={modalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddTask
            modalHandleClose={modalHandleClose}
            refreshTaskData={refreshTaskData}
          />
        </Modal>
      </Box>

      <Box sx={{ padding: "1rem", height: "4rem", scrollBehavior: "auto" }}>
        {taskDataForMap?.map((data, i) => (
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={data.id}
            expanded={expanded === `panel${i + 1}`}
            onChange={accrodianHandleChange(`panel${i + 1}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${data.id}-content`}
              id={data.id}
            >
              <Typography sx={{ width: "5%", flexShrink: 0 }}>
                {i + 1}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {data.taskName}
              </Typography>
              {/* <IconButton onClick={() => alert("three dot button clicked")}>
                <MoreVertIcon />
              </IconButton> */}
            </AccordionSummary>
            <AccordionDetails sx={{ paddingLeft: "5%" }}>
              <Stack direction="column">
                <Typography width="80%">{data.taskDiscription}</Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="self-end"
                >
                  <Stack direction="row" spacing={2}>
                    <Typography variant="subtitle2">
                      {data.taskStatus}
                    </Typography>
                    <Typography variant="subtitle2">
                      {data.createdAt}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.3}>
                    <Button
                      onClick={() => updateTask(data)}
                      size="small"
                      variant="contained"
                      color="info"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() =>
                        deleteTaskWithId(data.id).then((responce) => {
                          responce ? refreshTaskData() : console.log(responce);
                          // console.log(responce);
                          // const newAllTask = allTasks.filter( (task)=> task.id !== data.id );
                          // setAllTasks(newAllTask)
                        })
                      }
                      size="small"
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}

        <Modal open={updateTaskModalOpen} onClose={modalHandleClose}>
          <UpdateTask
            modalHandleClose={modalHandleClose}
            refresh={refreshTaskData}
            data={updateModalData}
          />
        </Modal>
      </Box>
    </>
  );
}
