<script setup>
import MessagePosted from './components/MessagePosted.vue'
// import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <main>
    <div class="container">
      <ul class="messages-list">
        <MessagePosted />
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
