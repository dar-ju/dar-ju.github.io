<script setup>
import { onMounted, ref } from 'vue'
import MessagePosted from './components/MessagePosted.vue'
import MessageSend from './components/MessageSend.vue'
import { useMessagesStore } from './stores/messagesStore'

const messagesStore = useMessagesStore()

onMounted(async () => {
  await messagesStore.getData()
})

const deleteMessage = () => {
  messagesStore.modifyMessage(
    messagesStore.idCommentToDelete[0],
    undefined,
    messagesStore.idCommentToDelete[1]
  )
  messagesStore.idCommentToDelete = []
}
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
      <div class="delete" v-show="messagesStore.idCommentToDelete.length > 0">
        <!-- <transition name="resize"> -->
        <div class="delete__block">
          <strong class="delete__title">Delete comment</strong>
          <p class="delete__descr">
            Are you shure you want to delete this comment? This will remove the comment and can't bu
            undone.
          </p>
          <div class="delete__button-block">
            <button
              class="main-btn delete__cancel-btn"
              @click="messagesStore.idCommentToDelete = []"
            >
              No, cancel
            </button>
            <button class="main-btn delete__confirm-btn" @click="deleteMessage()">
              Yes, delete
            </button>
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
    padding: 34px 32px;
    gap: 18px;
    background-color: var(--white);
    border-radius: 10px;
  }
  &__title {
    font-size: 1.48rem;
    color: var(--dark-blue);
  }
  &__descr {
    line-height: 1.5rem;
  }
  &__button-block {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
  &__cancel-btn {
    background-color: var(--grayish-blue);
    &:hover {
      background-color: var(--grayish-blue-light);
    }
  }
  &__confirm-btn {
    background-color: var(--soft-red);
    &:hover {
      background-color: var(--soft-red-light);
    }
  }
}
</style>
