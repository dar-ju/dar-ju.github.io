import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import db from './db.js'
import './auth/google.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))


app.use(passport.initialize())
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile'] }))

app.use(async (req, res, next) => {
  const sessionId = req.cookies.sessionId || req.cookies.session
  if (sessionId) {
    try {
      const session = await db.getSession(sessionId)
      if (session) {
        const user = await db.findUserBySessionId(sessionId)
        if (user) {
          req.user = user
        }
      }
    } catch (err) {
      console.error('Error processing session:', err)
    }
  }
  next()
})

async function userLogin(email, password, res) {
  const userDataFromDB = await db.findUserByEmail(email)
  if (!userDataFromDB) {
    return res.status(200).json({ authorized: false })
  }
  const hashPsw = userDataFromDB.password
  const match = await bcrypt.compare(password, hashPsw)
  if (match) {
    const user = await db.loginUser(email, hashPsw)
    const sessionId = await db.createSession(user.id)
    res.cookie('sessionId', sessionId, { httpOnly: true })
    res.json(user)
  }
  else {
    console.error('Wrong password')
    return res.status(200).json({ authorized: false })
  }
}

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body
    await userLogin(email, password, res)
  } catch (err) {
    console.error(`Login error: ${err}`)
  }
})

app.post('/api/logout', async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId
    await db.deleteSession(sessionId)
    res.clearCookie('sessionId')
    res.status(200).json({ message: 'Logged out' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Logout failed' })
  }
})

app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, username, img } = req.body
    if (!username) {
      const userDataFromDB = await db.findUserByEmail(email)
      if (!userDataFromDB) return res.status(200).json({ isUserRegistered: false })
      else return res.status(200).json({ isUserRegistered: true })
    }
    const hashPsw = await bcrypt.hash(password, 10)
    await db.createUser(email, hashPsw, username, img)
    await userLogin(email, password, res)
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
})

app.get('/api/me', (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json({ authorized: false })
    }
    res.status(200).json({ authorized: true, user: req.user })
  } catch (err) {
    res.status(500).json({ error: 'Get user data failed' })
  }
})

app.post('/api/userEdit', async (req, res) => {
  try {
    const { email, username, img } = req.body
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }
    await db.editUser(email, username, img)
    res.status(200).json({ message: 'User updated successfully' })
  } catch (err) {
    console.error('User edit error:', err)
    res.status(500).json({ error: 'User edit failed' })
  }
})

app.post("/api/mood", async (req, res) => {
  try {
    const { email, mood, feelings, journalEntry, sleepHours } = req.body
    await db.createMood(email, mood, feelings, journalEntry, sleepHours)
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Mood create error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
})

app.post('/api/moods', async (req, res) => {
  try {
    const { email, numberOfItems } = req.body
    const userDataFromDB = await db.findUserByEmail(email)
    const moods = await db.getMoods(userDataFromDB.id, numberOfItems)
    return res.status(200).json({ moods })
  } catch (error) {
    console.error('Mood get error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
})

app.get('/api/auth/google/callback', passport.authenticate('google', { session: false }), async (req, res) => {
  const userId = req.user
  const sessionToken = await db.createSession(userId)
  res.cookie('sessionId', sessionToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
  res.redirect('/')
})

app.use((req, res) => {
  res.send('Page not found')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`)
})
