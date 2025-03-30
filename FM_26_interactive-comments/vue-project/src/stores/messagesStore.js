import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMessagesApi } from '@/api/data'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref({})
  const messagesConverted = ref({})
  const currentUser = ref({})
  const messagesConverter = () => {
    messagesConverted.value = messages.value.flatMap(comment => [comment, ...comment.replies])
  }
  const getData = async () => {
    if (localStorage.getItem('messages')) {
      messages.value = JSON.parse(localStorage.getItem('messages'))
      currentUser.value = JSON.parse(localStorage.getItem('user'))
    } else {
      const response = await getMessagesApi()
      const comments = response.comments
      // const comments = response['comments'].flatMap(comment => [comment, ...comment.replies])
      messages.value = comments
      localStorage.setItem('messages', JSON.stringify(comments))
      const user = response.currentUser
      currentUser.value = user
      localStorage.setItem('user', JSON.stringify(user))
    }
    messagesConverter()
  }
  const sendNewMessage = (message) => {
    const newId = messagesConverted.value.length + 1
    messages.value.push({
      content: message,
      createdAt: 'just now',
      id: newId,
      replies: [],
      score: 0,
      user: {
        image: currentUser.value.image,
        username: currentUser.value.username,
      }
    })
    localStorage.setItem('messages', JSON.stringify(messages.value))
    messages.value = JSON.parse(localStorage.getItem('messages'))
    messagesConverter()
  }
  const sendReply = (message, replyForId, repliedTo) => {
    // const messageIndex = messagesConverted.value[messagesConverted.value.findIndex(el => el.replyingTo === replyTo)].id
    const messageIndex = messages.value.findIndex(el => el.id === replyForId)
    // const
    const newId = messagesConverted.value.length + 1
    messages.value[messageIndex].replies.pull({
      id: newId,
      content: message,
      createdAt: 'just now',
      score: 0,
      replyingTo: repliedTo,
      replyForId: replyForId,
      user: {
        image: currentUser.value.image,
        username: currentUser.value.username,
      }
    })
    localStorage.setItem('messages', JSON.stringify(messages.value))
    messages.value = JSON.parse(localStorage.getItem('messages'))
    messagesConverter()
  }
  const updateMessage = (message, replyForId, repliedTo, id) => {
    console.log(message);
    console.log(replyForId);
    console.log(repliedTo);

    const messageIndex = messages.value.findIndex(el => el.id === replyForId)
    // console.log(messageIndex);
    if (repliedTo) {
      const replyIndex = messages.value[messageIndex].replies.findIndex(el => el.id === id)
      messages.value[messageIndex].replies[replyIndex].content = message
    }
    else messages.value[messageIndex].content = message

    localStorage.setItem('messages', JSON.stringify(messages.value))
    messages.value = JSON.parse(localStorage.getItem('messages'))
    messagesConverter()
  }
  return { getData, messages, messagesConverted, currentUser, sendNewMessage, sendReply, updateMessage }
})
