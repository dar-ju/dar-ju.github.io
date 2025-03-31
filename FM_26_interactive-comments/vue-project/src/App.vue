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
  <main class="main">
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
    <div class="layout" v-show="messagesStore.isDelWindowOpened"></div>
  </main>
</template>

<style scoped>
.main {
  position: relative;
}
.messages-list {
  display: flex;
  margin-bottom: 22px;
  gap: 22px;
  flex-direction: column;
  align-items: flex-end;
}
.layout {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
