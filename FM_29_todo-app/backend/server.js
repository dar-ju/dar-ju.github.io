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
  orderTodo,
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error(err))

// local dev domen
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type'],
}

app.use(cors(corsOptions))


// SESSIONS
app.use(async (req, res, next) => {
  const sessionId = req.cookies.sessionId
  if (sessionId) {
    try {
      const session = await getSession(sessionId)
      if (session) {
        req.user = {
          _id: session.userId,
          username: session.username
        }
      }
    } catch (err) {
      console.error('Error processing session:', err)
    }
  }
  next()
})

app.get('/api/me', (req, res) => {
  if (req.user) {
    res.json({ username: req.user.username })
  } else {
    res.status(401).json({ user: 'User not authenticated' })
  }
})


// USER
async function userLogin(username, password, res) {
  const userDataFromDB = await findUserByUsername(username)
  const hashPsw = userDataFromDB.password
  const match = await bcrypt.compare(password, hashPsw)
  if (match) {
    const user = await loginUser(username, hashPsw)
    const sessionId = await createSession(user._id, username)
    res.cookie('sessionId', sessionId, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'None'
    })
    return res.json({ user: user.username })
  }
  else {
    console.error('Wrong password');
    res.status(401).json({ error: 'User does not exist or wrong password' })
  }
}

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    await userLogin(username, password, res)
  } catch (err) {
    console.error('Login server error:', err)
    res.status(401).json({ error: 'User does not exist or wrong password' })
  }
})

app.post("/logout", async (req, res) => {
  try {
    const sessionId = req.cookies?.sessionId
    if (sessionId) {
      await deleteSession(sessionId)
      res.clearCookie('sessionId', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        path: '/',
      })
    }
    res.status(200).json({ message: 'Logged out' })
  } catch (err) {
    console.error('Logout error:', err)
    res.status(500).json({ error: 'Server error. Try logout later.' })
  }
})

app.post("/signup", async (req, res) => {
  const { username, password } = req.body
  const hashPsw = await bcrypt.hash(password, 10)
  try {
    await createUser(username, hashPsw)
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Server error. Try to register later.' })
  }
  await userLogin(username, password, res)
})

app.get("/", (req, res) => {
  res.render("index", {
    user: req.user,
    authError: req.query.authError === "true" ? "Wrong username or password" : req.query.authError,
  })
})


// TODOS
// get all user tdos
app.get('/api/todos', async (req, res) => {
  const username = req.user.username
  try {
    const todos = await getAllUserTodos(username);
    res.json(todos);
  } catch (err) {
    console.error('Get todos error:', err)
    res.status(500).json({ error: 'Server error. Try later.' })
  }
});

// create new todo
app.post("/api/todos", async (req, res) => {
  const { todo } = req.body
  const username = req.user.username
  try {
    await createTodo(todo, username)
    res.status(200).json({ message: "Todo created" })
  } catch (err) {
    console.error('Add new todo error:', err)
    res.status(500).json({ error: 'Server error. Try add todo later.' })
  }
})

// toggle done todo
app.post("/api/todos/:id/done", async (req, res) => {
  const { id } = req.params
  try {
    await updateTodo(id, 'toggle')
    res.status(200).json({ message: "Todo status changed" })
  } catch (err) {
    console.error('Toogle todo status error:', err)
    res.status(500).json({ error: 'Server error. Try to change status later.' })
  }
})

// change todo order in list
app.put("/api/todos/:id/update-order", async (req, res) => {
  const { id } = req.params
  const { order } = req.body;
  try {
    await orderTodo(id, order)
    res.status(200).json({ message: "Todo order changed" })
  } catch (err) {
    console.error('Change order error:', err)
    res.status(500).json({ error: 'Server error. Try to change order later.' })
  }
})

// delete todo
app.post("/api/todos/:id/delete", async (req, res) => {
  const { id } = req.params
  try {
    await deleteTodo(id)
    res.status(200).json({ message: "Todo deleted" })
  } catch (err) {
    console.error('Delete todo error:', err)
    res.status(500).json({ error: 'Server error. Try to delete todo later.' })
  }
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
