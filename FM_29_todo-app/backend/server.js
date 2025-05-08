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

// SESSIONS
app.use(async (req, res, next) => {
  const sessionId = req.cookies.sessionId
  if (sessionId) {
    try {
      const session = await getSession(sessionId)
      if (session) {
        const user = await findUserBySessionId(sessionId)
        if (user) req.user = user
      }
    } catch (err) {
      console.error('Error processing session:', err)
    }
  }
  next()
})

app.get('/api/me', (req, res) => {
  if (req.user) {
    res.send(req.user.name)
  } else {
    res.status(401).json({ user: null })
  }
})


// USERS
async function userLogin(username, password, res) {
  const userDataFromDB = await findUserByUsername(username)
  const hashPsw = userDataFromDB.password
  const match = await bcrypt.compare(password, hashPsw)
  console.log(match);

  if (match) {
    const user = await loginUser(username, hashPsw)
    const sessionId = await createSession(user._id)
    res.cookie('sessionId', sessionId, { httpOnly: true })
  }
  else console.error('Wrong password');
  res.redirect('/')
}

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    await userLogin(username, password, res)
  } catch (err) {
    console.error('Login server error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

app.post("/logout", async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId
    await deleteSession(sessionId)
    res.clearCookie('sessionId')
    res.redirect('/')
  } catch (err) {
    res.redirect('/')
  }
})

app.post("/signup", async (req, res) => {
  const { username, password } = req.body
  const hashPsw = await bcrypt.hash(password, 10)
  await createUser(username, hashPsw)
  await userLogin(username, password, res)
})

app.get("/", (req, res) => {
  res.render("index", {
    user: req.user,
    authError: req.query.authError === "true" ? "Wrong username or password" : req.query.authError,
  })
})




// TODOS
// get all tdos
app.get('/api/todos', async (req, res) => {
  const todos = await getAllUserTodos('test');
  res.json(todos);
});

// create new todo
app.post("/api/todos", async (req, res) => {
  const { todo } = req.body
  // const user = req.user.username
  const user = 'test'
  await createTodo(todo, user)
  res.status(200).json({ message: "Todo created" })
})

// toggle done todo
app.post("/api/todos/:id/done", async (req, res) => {
  const { id } = req.params
  await updateTodo(id, 'toggle')
  res.status(200).json({ message: "Todo status changed" })
})

// delete todo
app.post("/api/todos/:id/delete", async (req, res) => {
  const { id } = req.params
  await deleteTodo(id)
  res.status(200).json({ message: "Todo deleted" })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
