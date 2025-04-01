<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { useMessagesStore } from '../stores/messagesStore'

const emit = defineEmits(['closeWindow'])
const messageText = ref('')
const messagesStore = useMessagesStore()

const props = defineProps({
  button: {
    type: String,
  },
  parentPostId: {
    type: Number,
  },
  repliedTo: {
    type: String,
  },
})

const postMessage = () => {
  if (messageText.value) {
    if (props.button === 'send') messagesStore.sendNewMessage(messageText)
    if (props.button === 'reply') {
      messagesStore.sendReply(messageText, props.parentPostId, props.repliedTo)
      emit('closeWindow', true)
    }
    messageText.value = ''
  }
}
</script>

<template>
  <div class="send">
    <picture>
      <source :srcset="messagesStore.currentUser?.image?.webp" type="image/webp" />
      <source :srcset="messagesStore.currentUser?.image?.png" type="image/png" />
      <img
        class="send__user-avatar"
        :src="messagesStore.currentUser?.image?.png"
        :alt="`${messagesStore.currentUser?.username} avatar`"
        width="41"
        height="41"
      />
    </picture>
    <form @submit.prevent="postMessage()" class="send__form">
      <textarea
        v-model="messageText"
        class="input"
        placeholder="Add a comment..."
        rows="4"
      ></textarea>
      <button v-show="props.button === 'send'" class="main-btn" type="submit">Send</button>
      <button v-show="props.button === 'reply'" class="main-btn" type="submit">Reply</button>
      <!-- <button v-show="props.button === 'update'" class="main-btn" type="submit">Update</button> -->
    </form>
  </div>
</template>

<style lang="scss" scoped>
.send {
  display: flex;
  padding: 24px;
  gap: 15px;
  border-radius: 10px;
  background-color: var(--white);
  &__user-avatar {
    min-width: 41px;
  }
  &__form {
    display: flex;
    width: 100%;
    gap: 15px;
  }
}
</style>
