<script setup>
import { ref } from 'vue'

const initialValues = ref({
  ingredient: [],
})

const onFormSubmit = () => {}
</script>

<template>
  <section class="step step3">
    <Form
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="flex justify-center flex-col gap-4"
    >
      <div class="flex flex-col gap-2">
        <CheckboxGroup name="ingredient" class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <Checkbox inputId="cheese" value="Cheese" />
            <label for="cheese"> Cheese </label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox inputId="mushroom" value="Mushroom" />
            <label for="mushroom"> Mushroom </label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox inputId="pepper" value="Pepper" />
            <label for="pepper"> Pepper </label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox inputId="onion" value="Onion" />
            <label for="onion"> Onion </label>
          </div>
        </CheckboxGroup>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </section>
</template>


<style lang="scss" scope>
</style>
