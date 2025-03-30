<script setup>
import { onMounted, ref } from 'vue'
import MessagePosted from './components/MessagePosted.vue'
import MessageSend from './components/MessageSend.vue'
import { useMessagesStore } from './stores/messagesStore'

const messagesStore = useMessagesStore()

onMounted(async () => {
  await messagesStore.getData()
})
</script>

<template>
  <main>
    <div class="container">
      <ul class="messages-list">
        <MessagePosted
          v-for="message in messagesStore.messagesConverted"
          :key="message.id"
          :message="message"
        />
      </ul>
      <MessageSend :button="'send'" />
    </div>
  </main>
</template>

<style scoped>
.messages-list {
  display: flex;
  margin-bottom: 22px;
  gap: 22px;
  flex-direction: column;
  align-items: flex-end;
}
</style>
