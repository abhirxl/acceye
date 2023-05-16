const { post, get, destroy, put } = require("./http-service");
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = "http://localhost:3000";

export const newUserRegistration = (userData) => {
  return post(`${apiUrl}/add`, userData);
};
export const userLogin = (userData) => {
  return post(`${apiUrl}/login`, userData);
};

export const getAllTasks = () => {
  return get(`${apiUrl}/tasks/all`);
};

export const createNewTask = (newTaskData) => {
  return post(`${apiUrl}/tasks/add`, newTaskData);
};
export const deleteTaskWithId = (id) => {
  return destroy(`${apiUrl}/tasks/delete/${id}`);
};
export const updateTaskWithId = (id, newData) => {
  return put(`${apiUrl}/tasks/update/${id}`, newData);
};

export const passwordFromDb = (email) => {
  return post(`${apiUrl}/recoverPassword`,email)
}