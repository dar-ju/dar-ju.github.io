import knex from 'knex'
import { nanoid } from 'nanoid'
import config from './knexfile.js'

const db = knex(config.development)

const TOKEN_VALIDITY_PERIOD = 1000 * 60 * 60 * 24 * 365


// USERS
const createUser = async (email, password, username, img) => {
  if (email && password) {
    try {
      const getUser = await findUserByEmail(email)
      if (!getUser) {
        const [newUser] = await db("users").insert({ email, password, username, img })
        return newUser
      }
    } catch (err) {
      console.error(`User ${email} not created, error (knex):`, err)
    }
  }
}

const loginUser = async (email, password) => {
  if (email && password) {
    try {
      const getUser = await findUserByEmail(email)
      if (!getUser) {
        console.error("User not found")
        return
      }
      if (getUser.google_id) {
        console.error("This user is registered via Google")
        return
      }
      if (getUser.email === email && getUser.password === password) return getUser
      else {
        console.error("User does not exist or password is incorrect")
        return
      }
    } catch (err) {
      console.error(`User ${email} does not exist or password is incorrect, error (knex):`, err)
    }
  }
}

const editUser = async (email, username, img) => {
  try {
    const user = await findUserByEmail(email)
    if (!user) throw new Error('User not found')
    await db('users').where({ id: user.id }).update({ username, img })
  } catch (err) {
    console.error(`User ${username} does not edited, error (knex):`, err)
  }
}

const findUserByEmail = async (email) => {
  try {
    const [user] = await db("users").select().where({ email }).limit(1)
    return user
  } catch (err) {
    console.error(`User with email ${email} not found, error (knex):`, err)
  }
}

const findUserBySessionId = async (sessionToken) => {
  try {
    const session = await db("sessions")
      .select("user_id")
      .where({ session_token: sessionToken })
      .limit(1)
      .then((results) => results[0])
    if (!session) return
    return db("users")
      .select()
      .where({ id: session.user_id })
      .limit(1)
      .then((results) => results[0])
  } catch (err) {
    console.error(`User for session ${sessionToken} not found, error (knex):`, err)
  }
}

// SESSIONS
const createSession = async (userId) => {
  try {
    const sessionToken = nanoid()
    await db("sessions").insert({ user_id: userId, session_token: sessionToken, expires_at: Date.now() + TOKEN_VALIDITY_PERIOD })
    return sessionToken
  } catch (err) {
    console.error(`Session was not created, error (knex):`, err)
  }
}

const getSession = async (session) => {
  try {
    const sessionToken = await db("sessions").where({ session_token: session }).first()
    return sessionToken
  } catch (err) {
    console.error(`Session ${session} not found, error (knex):`, err)
  }
}

const deleteSession = async (sessionToken) => {
  try {
    await db("sessions").where({ session_token: sessionToken }).delete()
  } catch (err) {
    console.error(`Session ${sessionToken} not deleted, error (knex):`, err)
  }
}

// MOODS
const createMood = async (email, mood, feelings, journalEntry, sleepHours) => {
  try {
    const user = await findUserByEmail(email)
    if (!user) throw new Error('User not found')
    const userId = user.id
    await db("moods").insert({ userId, mood, feelings: JSON.stringify(feelings), journalEntry, sleepHours })
  } catch (err) {
    console.error(`Mood not created, error (knex):`, err)
  }
}

const getMoods = async (userId, numberOfItems) => {
  try {
    const moodsQuery = await db('moods')
      .where({ userId })
      .orderBy('createdAt', 'desc')
      .limit(numberOfItems)
    return moodsQuery.reverse()
  } catch (err) {
    console.error(`Moods get error (knex):`, err)
    throw err
  }
}

export default {
  createUser,
  loginUser,
  editUser,
  createSession,
  findUserBySessionId,
  findUserByEmail,
  getSession,
  deleteSession,
  createMood,
  getMoods,
}
