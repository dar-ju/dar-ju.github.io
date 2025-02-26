import CountryCard from '../components/CountryCard.vue';
import { useCountriesStore } from '../stores/countryStore';
import { onMounted } from 'vue';
const countryStore = useCountriesStore();
onMounted(async () => {
    await countryStore.getCountries();
}); /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: ("section home") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: ("container home__container") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: ("home__wrapper") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: ("home__search-wrapper") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: ("text"),
    id: ("search"),
    ...{ class: ("field home__search") },
    placeholder: ("Search for a country..."),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: ("home__search-icon") },
    xmlns: ("http://www.w3.org/2000/svg"),
    width: ("20"),
    height: ("24"),
    viewBox: ("0 0 24 24"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: ("M 10 2 C 5.5935644 2 2 5.5935677 2 10 C 2 14.406432 5.5935644 18 10 18 C 11.844022 18 13.540969 17.365427 14.896484 16.310547 L 20.292969 21.707031 A 1.0001 1.0001 0 1 0 21.707031 20.292969 L 16.310547 14.896484 C 17.365427 13.540969 18 11.844021 18 10 C 18 5.5935677 14.406436 2 10 2 z M 10 4 C 13.325556 4 16 6.674446 16 10 C 16 13.325554 13.325556 16 10 16 C 6.6744439 16 4 13.325554 4 10 C 4 6.674446 6.6744439 4 10 4 z"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: ("home__filter") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: ("field home__filter-btn") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    xmlns: ("http://www.w3.org/2000/svg"),
    viewBox: ("0 0 24 24"),
    width: ("16"),
    height: ("16"),
    fill: ("none"),
    stroke: ("black"),
    'stroke-width': ("2"),
    'stroke-linecap': ("round"),
    'stroke-linejoin': ("round"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.polyline)({
    points: ("6 9 12 15 18 9"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: ("field home__filter-list") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: ("home__filter-item") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: ("#"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: ("home__filter-item") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: ("#"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: ("home__filter-item") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: ("#"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: ("home__filter-item") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: ("#"),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: ("home__filter-item") },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: ("#"),
});
for (const [country] of __VLS_getVForSourceType((__VLS_ctx.countryStore.countries))) {
    // @ts-ignore
    /** @type { [typeof CountryCard, ] } */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(CountryCard, new CountryCard({
        key: ((country.numericCode)),
        country: ((country)),
    }));
    const __VLS_1 = __VLS_0({
        key: ((country.numericCode)),
        country: ((country)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
['section', 'home', 'container', 'home__container', 'home__wrapper', 'home__search-wrapper', 'field', 'home__search', 'home__search-icon', 'home__filter', 'field', 'home__filter-btn', 'field', 'home__filter-list', 'home__filter-item', 'home__filter-item', 'home__filter-item', 'home__filter-item', 'home__filter-item',];
var __VLS_special;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CountryCard: CountryCard,
            countryStore: countryStore,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
