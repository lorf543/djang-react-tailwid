import axios from 'axios'

const tasksApi = axios.create({
   baseURL:'http://127.0.0.1:8000/api/v1task/'
});

export const getAllTasks = () => tasksApi.get('/');

export const createTask = (task) => tasksApi.post('/',task);

export const deleteTask = (id) => tasksApi.delete(`/${id}`);

export const updateTask =  (id,task) => tasksApi.put(`/${id}/`,task);
export const getTask =  (id) => tasksApi.get(`/${id}`);
