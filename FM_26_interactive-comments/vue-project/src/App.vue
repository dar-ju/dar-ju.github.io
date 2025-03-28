<script setup>
import { onMounted, ref } from 'vue'
import MessagePosted from './components/MessagePosted.vue'
import { useMessagesStore } from './stores/messagesStore'

const messagesStore = useMessagesStore()

onMounted(async () => {
  await messagesStore.getMessages()
  console.log(messagesStore.messages)
})
</script>

<template>
  <main>
    <div class="container">
      <ul class="messages-list">
        <MessagePosted
          v-for="message in messagesStore.messages"
          :key="message.key"
          :message="message"
        />
      </ul>
    </div>
  </main>
</template>

<style scoped>
.messages-list {
  display: flex;
  gap: 22px;
  flex-direction: column;
  align-items: flex-end;
}
</style>
