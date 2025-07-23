import knex from 'knex'
import { nanoid } from 'nanoid'
import config from './knexfile.js'

const db = knex(config.development)

const TOKEN_VALIDITY_PERIOD = 1000 * 60 * 60 * 24 * 7


// USERS
const createUser = async (email, password, username, img) => {
  if (email && password) {
    try {
      const getUser = await findUserByEmail(email)
      if (!getUser) {
        const [newUser] = await db("users").insert({ email, password, username, img })
        // await createNote(newUser, demoNote.title, demoNote.text)
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

const findUserByEmail = async (email) => {
  try {
    const [user] = await db("users").select().where({ email }).limit(1)
    return user
  } catch (err) {
    console.error(`User ${email} not found, error (knex):`, err)
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

// NOTES
// const getNotes = async (user_id, isArchived = 0, page = 1, period = 'alltime', search = '') => {
//   try {
//     const block = (page - 1) * NUMBER_NOTES_ON_PAGE
//     const notesQuery = db('notes')
//       .where({ user_id, isArchived })
//       .andWhere('title', 'like', `%${search}%`)
//       .orderBy('created', 'desc')
//       .limit(NUMBER_NOTES_ON_PAGE)
//       .offset(block)
//     if (period !== 'alltime') {
//       notesQuery.andWhere('created', '>=', db.raw(`NOW() - INTERVAL ${period}`))
//     }
//     const notes = await notesQuery

//     // number of notes for pagination
//     const allNotesQuery = db('notes')
//       .where({ user_id, isArchived })
//     if (period !== 'alltime') {
//       allNotesQuery.andWhere('created', '>=', db.raw(`NOW() - INTERVAL ${period}`))
//     }
//     const allNotes = await allNotesQuery
//     let hasMore = true
//     if (NUMBER_NOTES_ON_PAGE * page >= allNotes.length) hasMore = false

//     // search highlite
//     if (search.length) {
//       notes.forEach(element => {
//         const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
//         element.title = element.title.replace(regex, '<mark>$1</mark>')
//       })
//     }
//     return { notes, hasMore }
//   } catch (err) {
//     console.error(`Ошибка при получении заметок за период ${period} (knex):`, err)
//     throw err
//   }
// }

// const getNoteById = async (id) => {
//   try {
//     const note = await db("notes").where({ id }).select("*").first()
//     if (note) return note
//     else {
//       console.log(`Заметка с ID ${id} не найдена (knex).`)
//       return
//     }
//   } catch (err) {
//     console.error(`Ошибка при получении заметки с ID ${id} (knex):`, err)
//     throw err
//   }
// }

// const createNote = async (user, title, html) => {
//   try {
//     const [id] = await db('notes').insert({ user_id: user, title, html })
//     return id
//   } catch (err) {
//     console.error(`Ошибка при создании заметки "${title}" (knex):`, err)
//     throw err
//   }
// }

// const editNote = async (id, title, html) => {
//   try {
//     await db('notes').where({ id }).update({ title, html, updated: new Date() })
//   } catch (err) {
//     console.error(`Ошибка при изменении заметки с ID ${id} (knex):`, err)
//     throw err
//   }
// }

// const archiveToggleNote = async (id, isArchived) => {
//   try {
//     await db('notes').where({ id }).update({ isArchived })
//   } catch (err) {
//     console.error(`Ошибка при изменении заметки с ID ${id} (knex):`, err)
//     throw err
//   }
// }

// const deleteArchivedNote = async (id) => {
//   try {
//     await db('notes').where({ id }).del()
//   } catch (err) {
//     console.error(`Ошибка при удалении заметки (knex):`, err)
//     throw err
//   }
// }

// const deleteAllArchivedNotes = async () => {
//   try {
//     await db('notes').where({ isArchived: 1 }).del()
//   } catch (err) {
//     console.error(`Ошибка при удалении всех заметок (knex):`, err)
//     throw err
//   }
// }

// // GOOGLE auth
// const findUserByGoogleId = async (google_id) => {
//   try {
//     const [user] = await db('users').select().where({ google_id }).limit(1)
//     return user.id
//   } catch (err) {
//     console.error(`Пользователь с Google ID ${google_id} не найден, ошибка (knex):`, err)
//   }
// }

// const createGoogleUser = async ({ google_id, name }) => {
//   try {
//     const [user] = await db('users')
//       .insert({ google_id, username: name, password: 'oauth-google' })
//     await createNote(user, demoNote.title, demoNote.text)
//     return user
//   } catch (err) {
//     console.error(`Ошибка при создании Google-пользователя ${name} (knex):`, err)
//   }
// }


export default {
  createUser,
  loginUser,
  createSession,
  findUserBySessionId,
  findUserByEmail,
  getSession,
  deleteSession,
}
