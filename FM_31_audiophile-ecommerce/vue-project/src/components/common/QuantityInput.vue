<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  quantity: Number,
})

const amount = ref(props.quantity || 1)

const emit = defineEmits(['update'])
watch(amount, (val) => emit('update', val))

watch(
  () => props.quantity,
  (val) => {
    amount.value = val || 1
  },
)
</script>

<template>
  <div class="quantity-input">
    <label for="integeronly" class="quantity-input__label">Quantity</label>
    <InputNumber
      v-model="amount"
      inputId="integeronly"
      showButtons
      buttonLayout="horizontal"
      :min="0"
      :max="999"
      fluid
    >
      <template #incrementbuttonicon>
        <span class="quantity-input__icon">+</span>
      </template>
      <template #decrementbuttonicon><span class="quantity-input__icon">-</span></template>
    </InputNumber>
  </div>
</template>

<style lang="scss" scoped>
.quantity-input {
  max-width: 120px;
  height: 48px;
  background-color: var(--grey);
  & span {
    height: 100%;
  }
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border: none;
    & .pi {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &__label {
    position: absolute !important;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
