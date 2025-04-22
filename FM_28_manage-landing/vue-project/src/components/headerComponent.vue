<script setup></script>

<template>
  <header class="section header">
    <div class="container header__container">
      <a class="header__logo" href="#"><img src="/assets/images/logo.svg" alt="Manage logo" /></a>
      <nav>
        <ul class="header__nav-list">
          <li class="header__nav-item"><a href="#">Pricing</a></li>
          <li class="header__nav-item"><a href="#">Product</a></li>
          <li class="header__nav-item"><a href="#">About Us</a></li>
          <li class="header__nav-item"><a href="#">Careers</a></li>
          <li class="header__nav-item"><a href="#">Community</a></li>
        </ul>
      </nav>
      <Button class="main-btn" label="Get Started" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding-top: 56px;
  padding-bottom: 56px;
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__logo {
    margin-bottom: 5px;
    align-self: flex-end;
  }
  &__nav-list {
    display: flex;
    margin-right: 10px;
    gap: 33px;
  }
  &__nav-item {
    font-size: 0.68rem;
    font-weight: 500;
    color: var(--dark-blue);
    transition: color ease-in-out 0.3s;
    &:hover {
      color: var(--dark-grayish-blue);
    }
  }
}
</style>
