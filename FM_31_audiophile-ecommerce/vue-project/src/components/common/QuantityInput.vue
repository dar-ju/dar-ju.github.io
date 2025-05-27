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
    <InputNumber
      v-model="amount"
      inputId="integeronly"
      showButtons
      buttonLayout="horizontal"
      :min="0"
      fluid
      :inputProps="{
        inputmode: 'numeric',
        name: 'quantity',
        autocomplete: 'off',
        'aria-label': 'Количество',
      }"
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
}
</style>
