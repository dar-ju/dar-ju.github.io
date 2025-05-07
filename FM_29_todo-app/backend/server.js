import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import {
  getDb,
  getAllUserTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  createUser,
  loginUser,
  createSession,
  findUserBySessionId,
  findUserByUsername,
  getSession,
  deleteSession
} from './db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error(err))

// const Todo = mongoose.model('Todo', { title: String, content: String }, 'todos');

// get all tdos
app.get('/api/todos', async (req, res) => {
  const todos = await getAllUserTodos('test');
  res.json(todos);
});

// create new todo
app.post("/api/todos", async (req, res) => {
  const { todo } = req.body
  const user = req.user.username
  await createTodo(todo, user)
})

// toggle done todo
app.post("/api/todos/:id/done", async (req, res) => {
  const { id } = req.params
  await updateTodo(id, 'toggle')
  res.status(200).json({ message: "Todo status changed" })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
