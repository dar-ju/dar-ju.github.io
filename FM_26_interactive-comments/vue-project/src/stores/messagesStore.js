import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMessagesApi } from '@/api/data'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref({})
  const messagesConverted = ref({})
  const currentUser = ref({})
  const idCommentToDelete = ref(-1)
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
    const messageIndex = messages.value.findIndex(el => el.id === replyForId)
    const newId = messagesConverted.value.length + 1
    messages.value[messageIndex].replies.push({
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

  const modifyMessage = (id, message, replyForId) => {
    if (message) {
      if (replyForId) {
        const messageIndex = messages.value.findIndex(el => el.id === replyForId)
        const replyIndex = messages.value[messageIndex].replies.findIndex(el => el.id === id)
        messages.value[messageIndex].replies[replyIndex].content = message
      }
      else {
        const messageIndex = messages.value.findIndex(el => el.id === id)
        messages.value[messageIndex].content = message
      }
    }
    else {
      console.log(idCommentToDelete.value);

    }
    localStorage.setItem('messages', JSON.stringify(messages.value))
    messages.value = JSON.parse(localStorage.getItem('messages'))
    messagesConverter()
  }

  // const toggleDelWindow = () => {
  //   isDelWindowOpened.value = !isDelWindowOpened.value
  // }

  return {
    getData,
    messages,
    messagesConverted,
    currentUser,
    sendNewMessage,
    sendReply,
    modifyMessage,
    idCommentToDelete,
    // isDelWindowOpened,
    // toggleDelWindow,
  }
})
