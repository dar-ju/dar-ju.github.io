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
    <transition name="appear">
      <div class="delete" v-show="messagesStore.isDelWindowOpened">
        <!-- <transition name="resize"> -->
        <div class="delete__block">
          <strong class="delete__title">Delete comment</strong>
          <p class="delete__descr">
            Are you shure you want to delete this comment? This will remove the comment and can't bu
            undone.
          </p>
          <div class="delete__button-block">
            <button class="main-btn delete__cancel-btn">No, cancel</button>
            <button class="main-btn delete__confirm-btn">Yes, delete</button>
          </div>
        </div>
        <!-- </transition> -->
      </div>
    </transition>
  </main>
</template>

<style lang="scss" scoped>
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
.delete {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  &__block {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    padding: 30px;
    gap: 20px;
    background-color: var(--white);
    border-radius: 10px;
  }
  &__title {
    font-size: 1.48rem;
    color: var(--dark-blue);
  }
  &__descr {
  }
  &__button-block {
    display: flex;
    gap: 15px;
  }
}
</style>
