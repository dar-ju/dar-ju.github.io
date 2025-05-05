import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error(err))

const Post = mongoose.model('Post', { title: String, content: String })

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find()
  res.json(posts)
})

app.listen(process.env.PORT || 3000)
