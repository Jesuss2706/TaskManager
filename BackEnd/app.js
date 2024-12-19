import express from 'express'

const app = express();

import { getTaskById, getTasks, createTask, deleteTask, updateTask } from './database.js'

app.get("/tasks", async (req, res) => {
  const tasks = await getTasks;
  res.send(tasks);
})

app.get("/tasks/:id_task", async (req, res) => {
  const id = req.params.id_task;
  const task = await getTaskById(id);
  res.send(task);
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8080, () => {
  console.log('Server runing in port 8080');
})  