
<script setup>
</script>

<template>
  <li class="message">
    <div class="message__block">
      <div class="message__vote-button-group">
        <button class="message__vote-button">
          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="#C5C6EF"
            />
          </svg>
        </button>
        <span class="message__vote-result">12</span>
        <button class="message__vote-button">
          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="#C5C6EF"
            />
          </svg>
        </button>
      </div>
      <div class="message__body">
        <div class="message__header">
          <div class="message__user-block">
            <picture>
              <source srcset="../assets/images/avatars/image-amyrobson.webp" type="image/webp" />
              <source srcset="../assets/images/avatars/image-amyrobson.png" type="image/png" />
              <img
                class="message__user-avatar"
                src="../assets/images/avatars/image-amyrobson.png"
                alt=""
              />
            </picture>
            <span class="message__user-name">amyrobson</span>
            <span class="message__posted">1 month ago</span>
          </div>
          <div class="message__button-group">
            <!-- <button class="message__delete-button">Delete</button> -->
            <button class="message__reply-edit-button">
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                  fill="#5357B6"
                />
              </svg>
              Reply
            </button>
            <!-- <button class="message__edit-button">Edit</button> -->
          </div>
        </div>
        <p class="message__text">
          Impressive! Though it seems the drag feature could be improved. But overall it looks
          incredible. You've nailed the design and the responsiveness at various breakpoints works
          really well.
        </p>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.message {
  padding: 23px 25px;
  background-color: var(--white);
  border-radius: 10px;
  &__block {
    display: flex;
    gap: 25px;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__user-block {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &__user-avatar {
    width: 31px;
  }
  &__user-name {
    color: var(--dark-blue);
    font-weight: 500;
  }
  &__reply-edit-button {
    display: flex;
    gap: 7px;
    align-items: center;
    color: var(--moderate-blue);
    font-weight: 500;
  }
  &__message-delete-button {
  }
  &__body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__text {
    line-height: 1.5rem;
  }
  &__vote-button-group {
    display: flex;
    min-width: 39px;
    max-height: 100px;
    padding: 7px 0;
    gap: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--very-light-gray);
    border-radius: 10px;
  }
  &__vote-button {
    display: flex;
    min-height: 10px;
  }
  &__vote-result {
    color: var(--moderate-blue);
    font-weight: 700;
  }
}
</style>
