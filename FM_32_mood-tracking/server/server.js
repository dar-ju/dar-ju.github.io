import dotenv from 'dotenv'
import express from 'express'
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


app.use(passport.initialize())
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

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

async function userLogin(username, password, res) {
  const userDataFromDB = await db.findUserByUsername(username)
  const hashPsw = userDataFromDB.password
  const match = await bcrypt.compare(password, hashPsw)
  if (match) {
    const user = await db.loginUser(username, hashPsw)
    const sessionId = await db.createSession(user.id)
    res.cookie('sessionId', sessionId, { httpOnly: true })
    res.redirect('/dashboard')
  }
  else {
    console.error('Wrong password')
    res.redirect('/')
  }
}

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    await userLogin(username, password, res)
  } catch (err) {
    res.redirect('/')
  }
})

app.get("/logout", async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId
    await db.deleteSession(sessionId)
    res.clearCookie('sessionId')
    res.redirect('/')
  } catch (err) {
    res.redirect('/')
  }
})

app.post("/signup", async (req, res) => {
  const { username, password } = req.body
  const hashPsw = await bcrypt.hash(password, 10)
  await db.createUser(username, hashPsw)
  await userLogin(username, password, res)
})

// app.get("/api/notes", async (req, res) => {
//   if (!req.user) return res.status(401).json({ error: "User is not authorized" })
//   try {
//     const { age, search, page } = JSON.parse(req.query.filter)
//     const userId = req.user.id
//     let allNotes
//     if (age === 'archive') allNotes = await db.getNotes(userId, 1, page, 'alltime', search)
//     else if (age === '1month') allNotes = await db.getNotes(userId, 0, page, '1 MONTH', search)
//     else if (age === '3months') allNotes = await db.getNotes(userId, 0, page, '3 MONTH', search)
//     else allNotes = await db.getNotes(userId, 0, page, 'alltime', search)

//     res.json({ data: allNotes.notes || [], hasMore: allNotes.hasMore })
//   } catch (err) {
//     console.error("Ошибка при получении заметок:", err)
//     res.status(500).json({ error: "Ошибка сервера" })
//   }
// })


// app.get("/api/note/:id", async (req, res) => {
//   if (!req.user) return res.status(401).json({ error: "Пользователь не авторизован" })
//   try {
//     const noteId = req.params.id
//     const note = await db.getNoteById(noteId)
//     res.json(note)
//   } catch (err) {
//     console.error("Ошибка при получении заметки:", err)
//     res.status(500).json({ error: "Ошибка сервера" })
//   }
// })

// app.post("/api/note/new", async (req, res) => {
//   if (!req.user) return res.status(401).json({ error: "Пользователь не авторизован" })
//   try {
//     const { title, html } = req.body
//     const noteId = await db.createNote(req.user.id, title, html)
//     res.json({ id: noteId })
//   } catch (err) {
//     console.error("Ошибка при создании заметки:", err)
//     res.status(500).json({ error: "Ошибка сервера" })
//   }
// })

// app.put("/api/note/:id/edit", async (req, res) => {
//   if (!req.user) return res.status(401).json({ error: "Пользователь не авторизован" })
//   try {
//     if ('isArchived' in req.body) {
//       const { id, isArchived } = req.body
//       if (isArchived === true) await db.archiveToggleNote(id, 1)
//       else await db.archiveToggleNote(id, 0)
//     } else {
//       const { id, title, html } = req.body
//       await db.editNote(id, title, html)
//     }
//     const notes = await db.getNotes(req.user.id)
//     res.json({ data: notes })
//   } catch (err) {
//     console.error("Ошибка при изменении заметки:", err)
//     res.status(500).json({ error: "Ошибка сервера" })
//   }
// })

// app.delete('/api/note/:id/delete', async (req, res) => {
//   if (!req.user) return res.status(401).json({ error: "Пользователь не авторизован" })
//   try {
//     const { id } = req.params
//     await db.deleteArchivedNote(id)
//     res.json({ success: true })
//   } catch (err) {
//     console.error("Ошибка при удалении заметки:", err)
//     res.status(500).json({ error: "Ошибка сервера" })
//   }
// })

// app.delete('/api/notes/delete', async (req, res) => {
//   if (!req.user) return res.status(401).json({ error: "Пользователь не авторизован" })
//   try {
//     await db.deleteAllArchivedNotes()
//     res.json({ success: true })
//   } catch (err) {
//     console.error("Ошибка при удалении всех заметок:", err)
//     res.status(500).json({ error: "Ошибка сервера" })
//   }
// })

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), async (req, res) => {
  const userId = req.user
  const sessionToken = await db.createSession(userId)
  res.cookie('sessionId', sessionToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
  res.redirect('/')
})


app.get("/", (req, res) => {
  if (req.user) {
    res.redirect('/dashboard')
  } else res.render('index')
})

// app.get('/dashboard', (req, res) => {
//   if (req.user) res.render('dashboard', { username: req.user.username })
//   else res.redirect('/')
// })

app.use((req, res) => {
  res.send('Page not found')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`)
})
