import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMessagesApi } from '@/api/data'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref({})
  const messagesConverted = ref({})
  const currentUser = ref({})
  const idCommentToDelete = ref([])

  // get data function
  const getData = async () => {
    if (localStorage.getItem('messages')) {
      messages.value = JSON.parse(localStorage.getItem('messages'))
      currentUser.value = JSON.parse(localStorage.getItem('user'))
    } else {
      const response = await getMessagesApi()
      const comments = response.comments
      messages.value = comments
      localStorage.setItem('messages', JSON.stringify(comments))
      const user = response.currentUser
      currentUser.value = user
      localStorage.setItem('user', JSON.stringify(user))
    }
    messagesConverter()
  }

  // create new message
  const sendNewMessage = (message) => {
    const newId = messagesConverted.value.length + 1
    messages.value.push({
      content: message,
      createdAt: 'just now',
      id: newId,
      replies: [],
      score: 0,
      voters: [],
      user: {
        image: currentUser.value.image,
        username: currentUser.value.username,
      }
    })
    saveData()
  }

  // send reply to existing message
  const sendReply = (message, replyForId, repliedTo) => {
    const messageIndex = messages.value.findIndex(el => el.id === replyForId)
    const newId = messagesConverted.value.length + 1
    messages.value[messageIndex].replies.push({
      id: newId,
      content: message,
      createdAt: 'just now',
      score: 0,
      voters: [],
      replyingTo: repliedTo,
      replyForId: replyForId,
      user: {
        image: currentUser.value.image,
        username: currentUser.value.username,
      }
    })
    saveData()
  }

  // edit or delete message
  const modifyMessage = (postId, message = null, replyForId = null) => {
    const findMessageIndex = (messageId) => messages.value.findIndex(el => el.id === messageId);
    // if message edited
    if (message) {
      if (replyForId) {
        const messageIndex = findMessageIndex(replyForId);
        const replyIndex = messages.value[messageIndex].replies.findIndex(el => el.id === postId);
        messages.value[messageIndex].replies[replyIndex].content = message;
      } else {
        const messageIndex = findMessageIndex(postId);
        messages.value[messageIndex].content = message;
      }
    } else { // if message to delete
      if (replyForId) {
        const messageIndex = findMessageIndex(replyForId);
        const replyIndex = messages.value[messageIndex].replies.findIndex(el => el.id === postId);
        messages.value[messageIndex].replies.splice(replyIndex, 1);
      } else {
        const messageIndex = findMessageIndex(postId);
        messages.value.splice(messageIndex, 1);
      }
    }
    saveData()
  };

  // vote for message
  const vote = (value, user, postId, replyForId) => {
    if (replyForId) {
      const messageIndex = messages.value.findIndex(el => el.id === replyForId);
      const replyIndex = messages.value[messageIndex].replies.findIndex(el => el.id === postId);
      console.log(messages.value[messageIndex].replies[replyIndex]);
      messages.value[messageIndex].replies[replyIndex].voters.push(user)
      messages.value[messageIndex].replies[replyIndex].score += value
    } else {
      const messageIndex = messages.value.findIndex(el => el.id === postId);
      messages.value[messageIndex].voters.push(user)
      messages.value[messageIndex].score += value
    }
    saveData()
  }

  // auxiliary converter of data
  const messagesConverter = () => {
    messagesConverted.value = messages.value.flatMap(comment => [comment, ...comment.replies])
  }

  // save data to localstorage, refresh of ref and convert
  const saveData = () => {
    localStorage.setItem('messages', JSON.stringify(messages.value))
    messages.value = JSON.parse(localStorage.getItem('messages'))
    messagesConverter()
  }

  return {
    getData,
    messages,
    messagesConverted,
    currentUser,
    sendNewMessage,
    sendReply,
    modifyMessage,
    idCommentToDelete,
    vote,
  }
})
