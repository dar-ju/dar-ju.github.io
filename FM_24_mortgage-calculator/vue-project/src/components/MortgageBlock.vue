<script setup>
import { ref } from 'vue'

const minimumRate = 100
const minimumAmount = 1000

const form = ref({
  amount: '',
  term: '',
  rate: '',
  type: '',
})
const errors = ref([])
const totalPay = ref(0)
const monthPay = ref(0)

// Amount number format
const formatValue = (value) => {
  if (!value) return ''
  return new Intl.NumberFormat('en-US').format(value)
}

// Check for numbers
const handleInputFormat = (event, value) => {
  let rawValue = event.target.value.replace(/[^0-9]/g, '')
  if (event.target.value && formCheck(value))
    errors.value = errors.value.filter((item) => item !== value)
  if (value === 'amount') {
    form.value.amount = rawValue
    event.target.value = formatValue(rawValue)
  } else if (value === 'rate') {
    rawValue = event.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/^(\.)/, '')
      .replace(/(\..*)\./g, '$1')
    form.value[value] = rawValue
  } else form.value[value] = rawValue
}

// Check for errors on submit and calculate
const handleSubmit = () => {
  errors.value = []
  const values = Object.values(form.value)
  const keys = Object.keys(form.value)
  values.forEach((element, index) => {
    if (
      !element ||
      (index === 0 && element < minimumAmount) ||
      (index === 2 && element > minimumRate) ||
      element == 0
    )
      errors.value.push(keys[index])
    const firstErrorElem = document.getElementById(errors.value[0])
    firstErrorElem?.focus()
  })
  if (!Object.keys(errors.value).length) calculations()
}

// Check for minimal value
const minimumCheck = (val) => {
  const upper = val[0].toUpperCase() + val.slice(1)
  if (!form.value[val] || form.value[val] == 0) return 'This field is required'
  if (val === 'rate' && form.value[val] > minimumRate)
    return `${upper} should not be more ${minimumRate}`
  if (val === 'amount' && form.value[val] < minimumAmount)
    return `${upper} should be more ${minimumAmount}`
}

// Error fields control
const formCheck = (value) => {
  return errors.value.includes(value) ? true : false
}

// Reset form
const clearForm = () => {
  errors.value = []
  form.value = { amount: '', term: '', rate: '', type: '' }
  totalPay.value = 0
  monthPay.value = 0
}

// Mortgage calculations
const calculations = () => {
  const amount = Number(form.value.amount)
  const months = form.value.term * 12
  if (form.value.type === 'repayment') {
    const monthInterest = form.value.rate / 100 / 12
    const total =
      ((amount * monthInterest * (1 + monthInterest) ** months) /
        ((1 + monthInterest) ** months - 1)) *
      months
    totalPay.value = Math.round(total * 100) / 100
    monthPay.value = Math.round((total / months) * 100) / 100
  }
  if (form.value.type === 'interest') {
    const total = (amount * (form.value.rate / 100)) / 12
    totalPay.value = Math.round(total * months * 100) / 100
    monthPay.value = Math.round(total * 100) / 100
  }
}
</script>

<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <div :class="$style.wrapper">
        <form :class="$style.form">
          <div :class="$style.form_titleWrapper">
            <h1 :class="$style.form_title">Mortgage Calculator</h1>
            <button @click.prevent="clearForm()" :class="$style.form_clearBtn">Clear All</button>
          </div>
          <div :class="$style.form_calculatorWrapper">
            <div :class="$style.form_formPart">
              <label for="amount">Mortgage Amount</label>
              <div
                :class="[
                  $style.form_input,
                  $style.form_amountInput,
                  formCheck('amount') && $style.form_errorDecor,
                ]"
              >
                <input
                  v-bind:value="formatValue(form.amount)"
                  @input="handleInputFormat($event, 'amount')"
                  type="text"
                  id="amount"
                  maxlength="8"
                />
              </div>
              <Transition name="fade">
                <span
                  v-show="formCheck('amount')"
                  :class="$style.form_error"
                  id="error-amount"
                  aria-live="assertive"
                  >{{ minimumCheck('amount') }}</span
                >
              </Transition>
            </div>
            <div :class="$style.form_terms">
              <div :class="$style.form_formPart">
                <label for="term">Mortgage Term</label>
                <div
                  :class="[
                    $style.form_input,
                    $style.form_termInput,
                    formCheck('term') && $style.form_errorDecor,
                  ]"
                >
                  <input
                    v-model="form.term"
                    @input="handleInputFormat($event, 'term')"
                    type="text"
                    id="term"
                    maxlength="2"
                  />
                </div>
                <Transition name="fade">
                  <span
                    v-show="formCheck('term')"
                    :class="$style.form_error"
                    id="error-term"
                    aria-live="assertive"
                    >This field is required</span
                  >
                </Transition>
              </div>
              <div :class="$style.form_formPart">
                <label for="rate">Interest Rate</label>
                <div
                  :class="[
                    $style.form_input,
                    $style.form_rateInput,
                    formCheck('rate') && $style.form_errorDecor,
                  ]"
                >
                  <input
                    v-model="form.rate"
                    @input="handleInputFormat($event, 'rate')"
                    type="text"
                    id="rate"
                    maxlength="4"
                  />
                </div>
                <Transition name="fade">
                  <span
                    v-show="formCheck('rate')"
                    :class="$style.form_error"
                    id="error-rate"
                    aria-live="assertive"
                    >{{ minimumCheck('rate') }}</span
                  >
                </Transition>
              </div>
            </div>
            <fieldset :class="$style.form_type">
              <legend :class="$style.form_typeLegend">Mortgage Type</legend>
              <div :class="[$style.form_input, $style.form_radio, $style.form_repayment]">
                <input
                  v-model="form.type"
                  type="radio"
                  id="repayment"
                  name="type"
                  value="repayment"
                />
                <label for="repayment" :class="$style.form_radioWidth">Repayment</label>
              </div>
              <div :class="[$style.form_input, $style.form_radio, $style.form_interest]">
                <input
                  v-model="form.type"
                  type="radio"
                  id="interest"
                  name="type"
                  value="interest"
                />
                <label for="interest" :class="$style.form_radioWidth">Interest Only</label>
              </div>
              <Transition name="fade">
                <span
                  v-show="formCheck('type')"
                  :class="$style.form_error"
                  id="error-type"
                  aria-live="assertive"
                  >This field is required</span
                >
              </Transition>
            </fieldset>
          </div>
          <button
            @click.prevent="handleSubmit()"
            :class="$style.form_submitBtn"
            type="submit"
            aria-label="Calculate Monthly Repayments"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#133041"
                d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
              />
            </svg>
            Calculate Repayments
          </button>
        </form>

        <div :class="$style.result">
          <Transition name="fade">
            <div v-show="!totalPay" :class="[$style.result_common, $style.result_empty]">
              <img src="/assets/images/illustration-empty.svg" alt="" />
              <h2 :class="$style.result_emptyTitle">Results shown here</h2>
              <p :class="$style.result_emptyDescription">
                Complete the form and click “calculate repayments” to see what your monthly
                repayments would be.
              </p>
            </div>
          </Transition>
          <Transition name="fade">
            <div v-show="totalPay" :class="[$style.result_common, $style.result_done]">
              <h2 :class="$style.result_doneTitle">Your results</h2>
              <p :class="$style.result_doneDescription">
                Your results are shown below based on the information you provided. To adjust the
                results, edit the form and click “calculate repayments” again.
              </p>
              <div :class="$style.result_calculation">
                <div :class="$style.result_repayments">
                  <p :class="$style.result_repaymentsTitle">Your monthly repayments</p>
                  <strong :class="$style.result_repaymentsTotal"
                    >£{{ formatValue(monthPay) }}</strong
                  >
                </div>
                <div>
                  <p :class="$style.result_repayText">Total you'll repay over the term</p>
                  <strong :class="$style.result_repayTotal">£{{ formatValue(totalPay) }}</strong>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" module scoped>
@use '@/assets/styles/_functions.scss' as func;

.section {
  padding-top: func.rem(212);
  padding-bottom: func.rem(212);
}
.container {
  padding-right: func.rem(40);
  padding-left: func.rem(40);
  max-width: func.rem(1440);
  margin: 0 auto;
}
.wrapper {
  display: flex;
  max-width: func.rem(1008);
  margin: 0 auto;
  border-radius: func.rem(24);
  overflow: hidden;
  background-color: var(--white);
}
.form {
  width: 100%;
  padding: func.rem(41) func.rem(40);
  padding-bottom: func.rem(40);
  background-color: var(--white);
  &_titleWrapper {
    display: flex;
    margin-bottom: func.rem(45);
    align-items: center;
    justify-content: space-between;
  }
  &_title {
    color: var(--slate-900);
    font-size: func.rem(24);
  }
  &_clearBtn {
    position: relative;
    color: var(--slate-700);
    transition: color ease-in-out 0.3s;
  }
  &_clearBtn::after {
    content: '';
    position: absolute;
    width: 100%;
    height: func.rem(1);
    bottom: func.rem(-2);
    left: 0;
    background-color: var(--slate-700);
  }
  &_clearBtn:hover,
  &_clearBtn:hover::after,
  &_clearBtn:focus {
    color: var(--slate-900);
  }
  &_calculatorWrapper {
    display: flex;
    margin-bottom: func.rem(38);
    gap: func.rem(26);
    flex-direction: column;
  }
  &_formPart {
    display: flex;
    width: 100%;
    gap: func.rem(13);
    flex-direction: column;
  }
  &_input {
    display: flex;
    position: relative;
    min-height: func.rem(50);
    outline: func.rem(1) solid var(--slate-700);
    border-radius: func.rem(5);
    overflow: hidden;
    transition: outline ease-in-out 0.3s;
  }
  &_input::before {
    display: flex;
    position: absolute;
    height: 100%;
    top: 0;
    align-items: center;
    justify-content: center;
    font-size: func.rem(18);
    font-weight: 700;
    color: var(--slate-700);
    background-color: var(--slate-100);
    transition:
      background-color ease-in-out 0.3s,
      color ease-in-out 0.3s;
  }
  &_input input {
    width: 100%;
    padding-left: func.rem(14);
    color: var(--slate-900);
    font-size: func.rem(18);
    font-weight: 700;
  }
  &_input:hover {
    outline: func.rem(1) solid var(--slate-900);
  }
  &_input:focus-within {
    outline: func.rem(1) solid var(--lime);
  }
  &_input:focus-within::before {
    background-color: var(--lime);
    color: var(--slate-900);
  }
  &_amountInput {
    position: relative;
    padding-left: func.rem(44);
  }
  &_amountInput::before {
    content: '£';
    width: func.rem(44);
    left: 0;
  }
  &_termInput::before {
    content: 'years';
    width: func.rem(80);
    right: 0;
  }
  &_rateInput::before {
    content: '%';
    width: func.rem(51);
    right: 0;
  }
  &_error {
    font-size: func.rem(14);
    line-height: func.rem(19);
    color: var(--red);
  }
  &_errorDecor {
    outline: func.rem(1) solid var(--red);
    &::before {
      color: var(--white);
      background-color: var(--red);
    }
  }
  &_terms {
    display: flex;
    gap: func.rem(23);
  }
  &_type {
    display: flex;
    margin: 0;
    padding: 0;
    gap: func.rem(10);
    border: none;
    flex-direction: column;
  }
  &_typeLegend {
    margin-bottom: func.rem(15);
  }
  &_radio {
    display: flex;
    position: relative;
    align-items: center;
    padding: func.rem(14);
    padding-left: func.rem(19);
    transition: background-color ease-in-out 0.2s;
  }
  &_radioWidth {
    position: absolute;
    top: 28%;
    left: func.rem(56);
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
  &_radio input,
  &_radio label {
    cursor: pointer;
  }
  &_radio:hover {
    outline: func.rem(1) solid var(--lime);
  }
  &_radio:focus-within {
    background-color: var(--lime-liter);
  }
  &_radio input[type='radio'] {
    margin-right: func.rem(19);
    appearance: none;
    border: func.rem(2) solid var(--slate-700);
    border-radius: 50%;
    width: func.rem(18);
    height: func.rem(18);
    position: relative;
    accent-color: var(--lime);
    background-color: transparent;
    transition: all ease-in-out 0.3s;
  }
  &_radio input[type='radio']::after {
    content: '';
    display: block;
    width: func.rem(10);
    height: func.rem(10);
    border-radius: 50%;
    background-color: var(--lime);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  &_radio input[type='radio']:checked::after {
    opacity: 1;
  }
  &_radio input[type='radio']:checked,
  &_radio input[type='radio']:focus {
    border-color: var(--lime);
    box-shadow: 0 0 0 func.rem(1) var(--lime);
  }
  &_repayment,
  &_interest {
    vertical-align: top;
    font-size: func.rem(18);
    font-weight: 700;
    color: var(--slate-900);
  }
  &_submitBtn {
    display: flex;
    padding: func.rem(16) func.rem(40);
    align-items: center;
    justify-content: center;
    background-color: var(--lime);
    border-radius: func.rem(28);
    font-size: func.rem(18);
    font-weight: 700;
    transition: background-color ease-in-out 0.3s;
  }
  &_submitBtn svg {
    margin-right: func.rem(13);
  }
  &_submitBtn:hover,
  &_submitBtn:focus {
    background-color: var(--lime-lite);
  }
}

.result {
  display: flex;
  position: relative;
  width: 100%;
  padding: func.rem(40);
  background-color: var(--slate-900);
  border-bottom-left-radius: func.rem(80);
  &_common {
    display: flex;
    position: absolute;
    padding: 2.5rem;
    left: 0;
    flex-direction: column;
  }
  &_empty {
    gap: func.rem(18);
    align-items: center;
    align-self: center;
  }
  &_emptyTitle {
    color: var(--white);
  }
  &_emptyDescription {
    color: var(--slate-300);
    line-height: func.rem(24);
    text-align: center;
  }
  &_doneTitle {
    margin-bottom: func.rem(22);
    color: var(--white);
  }
  &_doneDescription {
    margin-bottom: func.rem(45);
    color: var(--slate-300);
    line-height: func.rem(20);
  }
  &_calculation {
    position: relative;
    padding: func.rem(36) func.rem(32);
    border-radius: func.rem(10);
    background-color: var(--color-blue900);
    overflow: hidden;
  }
  &_calculation::before {
    content: '';
    position: absolute;
    width: 100%;
    height: func.rem(10);
    left: 0;
    top: func.rem(-5);
    border-radius: func.rem(10);
    background-color: var(--lime);
  }
  &_repayments {
    margin-bottom: func.rem(34);
    padding-bottom: func.rem(37);
    border-bottom: func.rem(1) solid var(--slate-900);
  }
  &_repaymentsTitle {
    margin-bottom: func.rem(13);
    color: var(--slate-300);
  }
  &_repaymentsTotal {
    font-size: func.rem(56);
    color: var(--lime);
  }
  &_repayText {
    margin-bottom: func.rem(10);
  }
  &_repayTotal {
    font-size: func.rem(24);
    color: var(--white);
  }
}

@media (max-width: func.rem(1024)) {
  .wrapper {
    flex-direction: column;
  }
  .form {
    max-width: func.rem(700);
    align-self: center;
  }
  .result {
    min-height: func.rem(585);
    border-bottom-left-radius: 1.5rem;
    &_common {
      width: 100%;
      max-width: func.rem(700);
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
    }
    &_emptyDescription {
      min-width: func.rem(300);
    }
    &_doneDescription {
      min-width: func.rem(307);
    }
  }
}

@media (max-width: func.rem(578)) {
  .section {
    padding: 0;
  }
  .container {
    padding: 0;
  }
  .wrapper {
    border-radius: 0;
  }
  .form {
    padding: func.rem(33) func.rem(24);
    &_titleWrapper {
      margin-bottom: func.rem(30);
      gap: func.rem(12);
      flex-direction: column;
      align-items: flex-start;
    }
    &_input input {
      padding-left: func.rem(16);
      font-size: func.rem(18);
    }
    &_terms {
      flex-direction: column;
      gap: func.rem(28);
    }
    &_calculatorWrapper {
      margin-bottom: func.rem(22);
    }
    &_submitBtn {
      width: 100%;
    }
  }
  .result {
    min-height: func.rem(452);
    padding: 0;
    border-radius: 0;
    &_empty {
      padding: func.rem(30);
    }
    &_done {
      padding: func.rem(31) func.rem(24);
    }
    &_doneTitle {
      margin-bottom: func.rem(18);
    }
    &_doneDescription {
      margin-bottom: func.rem(24);
      line-height: func.rem(24);
    }
    &_calculation {
      padding: func.rem(27) func.rem(16);
    }
    &_repayments {
      margin-bottom: func.rem(19);
      padding-bottom: func.rem(18);
    }
    &_repaymentsTotal {
      font-size: func.rem(40);
    }
  }
}
</style>
