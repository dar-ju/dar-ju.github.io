<script setup>
import { ref, defineEmits } from 'vue'
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
  clearingEnteredText()
  if (messageText.value) {
    if (props.button === 'send') messagesStore.sendNewMessage(messageText)
    if (props.button === 'reply') {
      messagesStore.sendReply(messageText, props.parentPostId, props.repliedTo)
      emit('closeWindow', true)
    }
    messageText.value = ''
  }
}

const clearingEnteredText = () => {
  messageText.value = messageText.value.replace(/<[^>]*>/g, '').trim()
}
</script>

<template>
  <div class="send">
    <picture class="send__picture-wrapper">
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
        rows="3"
        maxlength="2000"
      ></textarea>
      <button
        v-show="props.button === 'send'"
        class="main-btn send__btn"
        type="submit"
        aria-label="Click to send message"
      >
        Send
      </button>
      <button
        v-show="props.button === 'reply'"
        class="main-btn send__btn"
        type="submit"
        aria-label="Click to reply message"
      >
        Reply
      </button>
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
    min-height: 41px;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  &__form {
    display: flex;
    width: 100%;
    gap: 15px;
  }
}

@media (max-width: 820px) {
  .send {
    position: relative;
    padding: 15px;
    flex-direction: column;
    &__picture-wrapper {
      order: 1;
    }
    &__btn {
      position: absolute;
      right: 16px;
      bottom: 8px;
    }
  }
}
</style>
