import dotenv from 'dotenv'
dotenv.config()
import { nanoid } from 'nanoid'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// USERS
const getAllUsers = async () => { // РАБОЧИЙ
  let connection
  try {
    connection = await pool.getConnection()
    const [rows] = await connection.execute('SELECT * FROM users')
    return rows
  } catch (err) {
    console.error('Getting all users error:', err)
    throw err
  } finally {
    if (connection) connection.release()
  }
}

const createUser = async (username, password) => { // РАБОЧИЙ
  let connection
  try {
    connection = await pool.getConnection()
    await connection.execute(`
      INSERT INTO users (username, password)
      VALUES (?, ?)`, [username, password]
    );
  } catch (err) {
    console.error('Create user error:', err)
    throw err
  } finally {
    if (connection) connection.release()
  }
}


const loginUser = async (username, password) => { // РАБОЧИЙ (не проверен)
  if (username && password) {
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

const findUserBySessionId = async (sessionId) => { // РАБОЧИЙ (null возвращает)
  let connection
  try {
    connection = await pool.getConnection()
    const [rows] = await connection.execute('SELECT * FROM sessions WHERE session_id = ?', [sessionId])
    if (rows.length > 0) {
      return rows[0]
    } else {
      return null;
    }
  } catch (err) {
    console.error(`Getting user error with session id ${sessionId}:`, err)
    throw err
  } finally {
    if (connection) connection.release()
  }
}

const getUserById = async (id) => { // РАБОЧИЙ
  let connection
  try {
    connection = await pool.getConnection()
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id])
    if (rows.length > 0) {
      return rows[0]
    } else {
      return null;
    }
  } catch (err) {
    console.error(`Getting user error with id ${id}:`, err)
    throw err
  } finally {
    if (connection) connection.release()
  }
}

const findUserByUsername = async (username) => { // РАБОЧИЙ
  let connection
  try {
    connection = await pool.getConnection()
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username])
    if (rows.length > 0) {
      console.log(rows[0]);

      return rows[0]
    } else {
      return null;
    }
  } catch (err) {
    console.error(`Getting user error with username ${username}:`, err)
    throw err
  } finally {
    if (connection) connection.release()
  }
}

// // SESSIONS
const createSession = async (userId) => {
  let connection
  try {
    connection = await pool.getConnection()
    const sessionId = nanoid()
    await connection.execute(`
      INSERT INTO sessions (user_id, session_id)
      VALUES (?, ?)`, [userId, sessionId]
    );
  } catch (err) {
    console.error('Create user error:', err)
    throw err
  } finally {
    if (connection) connection.release()
  }
}

const getSession = async (session) => {
  let connection
  try {
    connection = await pool.getConnection()
    const [rows] = await connection.execute('SELECT * FROM sessions WHERE session_id = ?', [session])
    if (rows.length > 0) {
      return rows[0]
    } else {
      return null;
    }
  } catch (err) {
    console.error(`Getting session error with ${session}:`, err)
    throw err
  } finally {
    if (connection) connection.release()
  }
}

const deleteSession = async (sessionId) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM sessions WHERE session_id = ?', [sessionId])
    if (result.affectedRows > 0) {
      console.log(`Сессия ${sessionId} удалена.`);
      return true;
    } else {
      console.log(`Сессия ${sessionId} не найдена.`);
      return false;
    }
  } catch (err) {
    console.error(`Ошибка при удалении сессии ${sessionId}:`, err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

export {
  getAllUsers,
  createUser,
  loginUser,
  findUserBySessionId,
  getUserById,
  findUserByUsername,
  createSession,
  getSession,
  deleteSession,
}


// const loginUser = async (username, password) => {
//   if (username && password) {
//     db = await getDb();
//     try {
//       const getUser = await findUserByUsername(username)
//       if (!getUser) {
//         console.error('User not found')
//         return
//       }
//       if (getUser.username === username && getUser.password === password) return getUser
//       else {
//         console.error('Incorrect password')
//         return
//       }
//     } catch (err) {
//       console.error(`User ${username} does not exist or incorrect password:`, err)
//     }
//   }
// }

// const findUserByUsername = async (username) => {
//   db = await getDb();
//   try {
//     const user = await db.collection('users').findOne({ username })
//     return user
//   } catch (err) {
//     console.error(`User ${username} not found:`, err)
//   }
// }

// const findUserBySessionId = async (sessionId) => {
//   db = await getDb();
//   try {
//     const session = await db.collection('sessions').findOne({ sessionId }, { projection: { userId: 1 } })
//     if (!session) return
//     return await db.collection('users').findOne({ _id: session.userId })
//   } catch (err) {
//     console.error(`User by session ${sessionId} not found:`, err)
//   }
// }

// // SESSIONS
// const createSession = async (userId, username) => {
//   db = await getDb();
//   try {
//     const sessionId = nanoid()
//     await db.collection('sessions').insertOne({ userId, username, sessionId })
//     return sessionId
//   } catch (err) {
//     console.error(`Session was not created:`, err)
//   }
// }

// const getSession = async (session) => {
//   db = await getDb();
//   try {
//     const sessionId = await db.collection('sessions').findOne({ sessionId: session })
//     return sessionId
//   } catch (err) {
//     console.error(`Session ${session} not found:`, err)
//   }
// }

// const deleteSession = async (sessionId) => {
//   db = await getDb();
//   try {
//     await db.collection('sessions').deleteOne({ sessionId })
//   } catch (err) {
//     console.error(`Session ${sessionId} not deleted:`, err)
//   }
// }




// import dotenv from 'dotenv'
// dotenv.config()
// import mysql from 'mysql2/promise';

// async function main() {
//   const conn = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 3306,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     ssl: { rejectUnauthorized: false },
//   });

//   await conn.execute(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       username VARCHAR(50) UNIQUE NOT NULL,
//       password VARCHAR(100) NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `);

//   await conn.execute(`
//     INSERT INTO users (username, password)
//     VALUES (?, ?)`, ['test', '123']
//   );

//   console.log('✅ Данные успешно добавлены');
//   await conn.end();
// }

// main().catch(console.error);




// import dotenv from 'dotenv'
// dotenv.config()
// import mysql from 'mysql2/promise'

// const pool = mysql.createPool({ // Используем пул соединений
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306, // 3306 - стандартный порт MySQL
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   waitForConnections: true,
//   connectionLimit: 10, // Максимальное количество соединений в пуле
//   queueLimit: 0
// });

// const getAllUsers = async () => {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     const [rows] = await connection.execute('SELECT * FROM users');
//     console.log('Все пользователи:', rows);
//     return rows;
//   } catch (err) {
//     console.error('Ошибка при получении всех пользователей:', err);
//     throw err;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// const getUserById = async (id) => {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
//     if (rows.length > 0) {
//       console.log(`Пользователь с ID ${id}:`, rows[0]);
//       return rows[0];
//     } else {
//       console.log(`Пользователь с ID ${id} не найден.`);
//       return null;
//     }
//   } catch (err) {
//     console.error(`Ошибка при получении пользователя с ID ${id}:`, err);
//     throw err;
//   } finally {
//     if (connection) connection.release();
//   }
// };

// // Пример использования:
// getAllUsers();
// getUserById(2);
// getUserById(99); // Несуществующий ID



// import dotenv from 'dotenv'
// dotenv.config()
// import mysql from 'mysql2/promise'

// const pool = mysql.createPool({ // Используем пул соединений
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306, // 3306 - стандартный порт MySQL
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   waitForConnections: true,
//   connectionLimit: 10, // Максимальное количество соединений в пуле
//   queueLimit: 0
// });

// (async () => {
//   let connection;
//   try {
//     connection = await pool.getConnection(); // Получаем соединение из пула
//     const [rows, fields] = await connection.execute('SELECT * FROM users');
//     console.log(rows);
//   } catch (err) {
//     console.error('Ошибка при запросе:', err);
//   } finally {
//     if (connection) connection.release(); // Освобождаем соединение обратно в пул
//   }
// })();





// let db

// async function getDb() {
//   if (db) return db
//   try {
//     await client.connect()
//     db = client.db('FM-todo')
//     return db
//   } catch (err) {
//     console.err(`Error connection to mongo:`, err)
//   }
// }

// // USERS
// const createUser = async (username, password) => {
//   if (username && password) {
//     db = await getDb();
//     try {
//       const getUser = await findUserByUsername(username)
//       if (!getUser) {
//         await db.collection('users').insertOne({ username, password })
//       }
//     } catch (err) {
//       console.error(`User ${username} did't created:`, err)
//     }
//   }
// }

// const loginUser = async (username, password) => {
//   if (username && password) {
//     db = await getDb();
//     try {
//       const getUser = await findUserByUsername(username)
//       if (!getUser) {
//         console.error('User not found')
//         return
//       }
//       if (getUser.username === username && getUser.password === password) return getUser
//       else {
//         console.error('Incorrect password')
//         return
//       }
//     } catch (err) {
//       console.error(`User ${username} does not exist or incorrect password:`, err)
//     }
//   }
// }

// const findUserByUsername = async (username) => {
//   db = await getDb();
//   try {
//     const user = await db.collection('users').findOne({ username })
//     return user
//   } catch (err) {
//     console.error(`User ${username} not found:`, err)
//   }
// }

// const findUserBySessionId = async (sessionId) => {
//   db = await getDb();
//   try {
//     const session = await db.collection('sessions').findOne({ sessionId }, { projection: { userId: 1 } })
//     if (!session) return
//     return await db.collection('users').findOne({ _id: session.userId })
//   } catch (err) {
//     console.error(`User by session ${sessionId} not found:`, err)
//   }
// }

// // SESSIONS
// const createSession = async (userId, username) => {
//   db = await getDb();
//   try {
//     const sessionId = nanoid()
//     await db.collection('sessions').insertOne({ userId, username, sessionId })
//     return sessionId
//   } catch (err) {
//     console.error(`Session was not created:`, err)
//   }
// }

// const getSession = async (session) => {
//   db = await getDb();
//   try {
//     const sessionId = await db.collection('sessions').findOne({ sessionId: session })
//     return sessionId
//   } catch (err) {
//     console.error(`Session ${session} not found:`, err)
//   }
// }

// const deleteSession = async (sessionId) => {
//   db = await getDb();
//   try {
//     await db.collection('sessions').deleteOne({ sessionId })
//   } catch (err) {
//     console.error(`Session ${sessionId} not deleted:`, err)
//   }
// }

// // TODOS
// const getAllUserTodos = async (user) => {
//   db = await getDb();
//   try {
//     const todos = await db.collection('todos').find({ user }).toArray();
//     if (todos) return todos
//   } catch (err) {
//     console.error('Get todos error:', err)
//     throw err
//   }
// }

// const createTodo = async (todo, user) => {
//   if (todo) {
//     db = await getDb();
//     try {
//       const lastTodo = await db.collection('todos').find({ user }).sort({ order: -1 }).limit(1).toArray();
//       const nextOrder = lastTodo.length > 0 ? lastTodo[0].order + 1 : 0
//       await db.collection('todos').insertOne({ user, done: false, todo, order: nextOrder })
//     } catch (err) {
//       console.error(`Creation todo "${todo}" error:`, err)
//       throw err
//     }
//   }
// }

// const getTodoById = async (id) => {
//   db = await getDb();
//   try {
//     const todo = await db.collection('todos').findOne({ _id: new ObjectId(id) })
//     if (todo) return todo
//     else {
//       console.log(`Todo with ID ${id} not found.`)
//       return
//     }
//   } catch (err) {
//     console.error(`Get todo with ID ${id} error:`, err)
//     throw err
//   }
// }

// const updateTodo = async (id, done) => {
//   db = await getDb();
//   try {
//     const todo = await getTodoById(id)
//     const result = todo.done ? false : true
//     await db.collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: { done: result } })
//   } catch (err) {
//     console.error(`Update todo with ID ${id} error:`, err)
//     throw err
//   }
// }

// const orderTodo = async (id, order) => {
//   db = await getDb();
//   try {
//     const todo = await getTodoById(id)
//     await db.collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: { order } })
//   } catch (err) {
//     console.error(`Order change todo with ID ${id} error:`, err)
//     throw err
//   }
// }

// const deleteTodo = async (id) => {
//   db = await getDb();
//   try {
//     await db.collection('todos').deleteOne({ _id: new ObjectId(id) })
//   } catch (err) {
//     console.error(`Delete todo with ID ${id} error:`, err)
//     throw err
//   }
// }

// export {
//   getDb,
//   getAllUserTodos,
//   createTodo,
//   getTodoById,
//   updateTodo,
//   orderTodo,
//   deleteTodo,
//   createUser,
//   loginUser,
//   createSession,
//   findUserBySessionId,
//   findUserByUsername,
//   getSession,
//   deleteSession
// }
