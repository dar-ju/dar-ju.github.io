import { defineProps } from 'vue';
import { useCountriesStore } from '../stores/countryStore';
const countryStore = useCountriesStore();
const props = defineProps({
    country: {
        type: Object,
        required: false,
    },
}); /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: ("country-card") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    ...{ class: ("country-card__wrapper") },
    href: ("#"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ class: ("country-card__image") },
    src: (""),
    alt: (""),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: ("country-card__block") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: ("country-card__title") },
});
(__VLS_ctx.country?.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: ("country-card__description") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: ("country-card__description") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: ("country-card__description") },
});
['country-card', 'country-card__wrapper', 'country-card__image', 'country-card__block', 'country-card__title', 'country-card__description', 'country-card__description', 'country-card__description',];
var __VLS_special;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        country: {
            type: Object,
            required: false,
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        country: {
            type: Object,
            required: false,
        },
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
