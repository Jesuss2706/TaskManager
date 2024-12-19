import express from 'express'
import http from "http";
import bodyParser from "body-parser";
import cookiesParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { getTaskById, getTasks, createTask, deleteTask, updateTask } from './database.js';

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookiesParser());
app.use(bodyParser.json());

//insert: POS (Create), Select: GET (READ), updated: PUT (Update),  delete: DELETE (delete) => CRUD
app.get("/tasks", async (req, res) => {
  const tasks = await getTasks();
  res.send(tasks[0]);
})

app.get("/tasks/:id_task", async (req, res) => {
  const id = req.params.id_task;
  const task = await getTaskById(id);
  res.send(task);
});

app.post("/tasks", async (req, res) => {
  const { name, description, startDate, endDate, priority } = req.body;
  const task = await createTask(name, description, startDate, endDate, priority);
  res.send(task);
});

app.put("/tasks/:id_task", async (req, res) => {
  const id = req.params.id_task;
  const { name, description, startDate, endDate, priority } = req.body;
  const task = await updateTask(id, name, description, startDate, endDate, priority);
  res.send(task);
});

app.delete("/tasks/:id_task", async (req, res) => {
  const id = req.params.id_task;
  const task = await deleteTask(id);
  res.status(201).send({});
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//port when start the proyect    
const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server runing in port localhost:8080');
})  