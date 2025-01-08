<script setup></script>

<template>
  <div class="container header">
    <a href="#" class="header__logo"><img src="@/assets/images/logo.svg" alt="Sneakers logo" /></a>
    <nav class="header__nav">
      <ul class="header__menu">
        <li class="header__menu-item">Collections</li>
        <li class="header__menu-item">Men</li>
        <li class="header__menu-item">Women</li>
        <li class="header__menu-item">About</li>
        <li class="header__menu-item">Contact</li>
      </ul>
    </nav>
    <div class="header__profile">
      <a href="#" class="header__cart"></a>
      <a href="#" class="header__avatar"
        ><img src="@/assets/images/image-avatar.png" alt="User avatar"
      /></a>
    </div>
  </div>
</template>

<style scope>
.header {
  width: 100%;
  display: flex;
  align-items: center;
}

.header__logo {
  margin-right: 56px;
}

.header__nav {
  width: 400px;
}

.header__menu {
  display: flex;
  width: 100%;
  gap: 15px;
  justify-content: space-between;
}

.header__profile {
  display: flex;
  margin-left: auto;
  gap: 42px;
  align-self: flex-end;
}

.header__cart {
  width: 30px;
  background-image: url('@/assets/images/icon-cart.svg');
  background-repeat: no-repeat;
  background-position: center;
}

.header__avatar {
  width: 50px;
}
</style>
