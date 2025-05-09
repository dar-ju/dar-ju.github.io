import dotenv from 'dotenv'
dotenv.config()
import { nanoid } from 'nanoid'
import { MongoClient, ObjectId } from 'mongodb'
const client = new MongoClient(process.env.MONGO_URI);

let db

async function getDb() {
  if (db) return db
  try {
    await client.connect()
    db = client.db('FM-todo')
    return db
  } catch (err) {
    console.err(`Error connection to mongo:`, err)
  }
}

// USERS
const createUser = async (username, password) => {
  if (username && password) {
    db = await getDb();
    try {
      const getUser = await findUserByUsername(username)
      if (!getUser) {
        await db.collection('users').insertOne({ username, password })
      }
    } catch (err) {
      console.error(`User ${username} did't created:`, err)
    }
  }
}

const loginUser = async (username, password) => {
  if (username && password) {
    db = await getDb();
    try {
      const getUser = await findUserByUsername(username)
      if (!getUser) {
        console.error('User not found')
        return
      }
      if (getUser.username === username && getUser.password === password) return getUser
      else {
        console.error('Incorrect password')
        return
      }
    } catch (err) {
      console.error(`User ${username} does not exist or incorrect password:`, err)
    }
  }
}

const findUserByUsername = async (username) => {
  db = await getDb();
  try {
    const user = await db.collection('users').findOne({ username })
    return user
  } catch (err) {
    console.error(`User ${username} not found:`, err)
  }
}

const findUserBySessionId = async (sessionId) => {
  db = await getDb();
  try {
    const session = await db.collection('sessions').findOne({ sessionId }, { projection: { userId: 1 } })
    if (!session) return
    return await db.collection('users').findOne({ _id: session.userId })
  } catch (err) {
    console.error(`User by session ${sessionId} not found:`, err)
  }
}

// SESSIONS
const createSession = async (userId, user) => {
  db = await getDb();
  try {
    const sessionId = nanoid()
    await db.collection('sessions').insertOne({ userId, user, sessionId })
    return sessionId
  } catch (err) {
    console.error(`Session was not created:`, err)
  }
}

const getSession = async (session) => {
  db = await getDb();
  try {
    const sessionId = await db.collection('sessions').findOne({ sessionId: session })
    return sessionId
  } catch (err) {
    console.error(`Session ${session} not found:`, err)
  }
}

const deleteSession = async (sessionId) => {
  db = await getDb();
  try {
    await db.collection('sessions').deleteOne({ sessionId })
  } catch (err) {
    console.error(`Session ${sessionId} not deleted:`, err)
  }
}

// TODOS
const getAllUserTodos = async (user) => {
  db = await getDb();
  try {
    const todos = await db.collection('todos').find({ user }).toArray();
    if (todos) return todos
  } catch (err) {
    console.error('Get todos error:', err)
    throw err
  }
}

const createTodo = async (todo, user) => {
  if (todo) {
    db = await getDb();
    try {
      await db.collection('todos').insertOne({ user, done: false, todo })
    } catch (err) {
      console.error(`Creation todo "${todo}" error:`, err)
      throw err
    }
  }
}

const getTodoById = async (id) => {
  db = await getDb();
  try {
    const todo = await db.collection('todos').findOne({ _id: new ObjectId(id) })
    if (todo) return todo
    else {
      console.log(`Todo with ID ${id} not found.`)
      return
    }
  } catch (err) {
    console.error(`Get todo with ID ${id} error:`, err)
    throw err
  }
}

const updateTodo = async (id, done) => {
  db = await getDb();
  try {
    const todo = await getTodoById(id)
    const result = todo.done ? false : true
    await db.collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: { done: result } })
  } catch (err) {
    console.error(`Update todo with ID ${id} error:`, err)
    throw err
  }
}

const deleteTodo = async (id) => {
  db = await getDb();
  try {
    // const todo = await getTodoById(id)
    await db.collection('todos').deleteOne({ _id: new ObjectId(id) })
  } catch (err) {
    console.error(`Delete todo with ID ${id} error:`, err)
    throw err
  }
}

export {
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
}
