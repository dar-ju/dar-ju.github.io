import{_ as v,r as u,a as _,c,b as t,d as p,e as m,f,T as k,t as i,n as o,h}from"./index-CPOcggrz.js";import{d as g}from"./data-BLNGAJt1.js";const C={class:"crew__wrapper"},b={class:"container crew__container"},x={class:"crew__animation-wrapper"},V={class:"crew__text-block"},$={class:"crew__info"},y={class:"title title-4 crew__subtitle"},A={class:"title title-3 crew__subtitle-2"},D={class:"paragraph-2 crew__description"},I={class:"crew__nav"},N={class:"crew__nav-list",role:"menu"},B=["src"],H={__name:"CrewComponent",setup(w){const l=u({}),s=u({});l.value=g.crew;const d=r=>new URL(r,import.meta.url).href,a=r=>{const e=l.value.findIndex(n=>n.name===r);s.value=l.value[e]};return a("Douglas Hurley"),(r,e)=>(_(),c("main",C,[t("section",b,[e[8]||(e[8]=t("h1",{class:"text-1 crew__title"},[t("span",{class:"crew__title-number"},"02"),p("Meet your crew")],-1)),t("div",x,[m(k,{name:"fade-block",mode:"in-out"},{default:f(()=>[(_(),c("div",{key:s.value.name,class:"crew__block"},[t("div",V,[t("div",$,[t("h2",y,i(s.value.role),1),t("h3",A,i(s.value.name),1),t("p",D,i(s.value.bio),1)]),t("div",I,[t("ul",N,[t("li",{onClick:e[0]||(e[0]=n=>a("Douglas Hurley")),class:o(["crew__nav-item",{"crew__nav-item_active":s.value.name==="Douglas Hurley"}]),role:"menuitem"},e[4]||(e[4]=[t("a",{class:"link",href:"#"},null,-1)]),2),t("li",{onClick:e[1]||(e[1]=n=>a("Mark Shuttleworth")),class:o(["crew__nav-item",{"crew__nav-item_active":s.value.name==="Mark Shuttleworth"}]),role:"menuitem"},e[5]||(e[5]=[t("a",{class:"link",href:"#"},null,-1)]),2),t("li",{onClick:e[2]||(e[2]=n=>a("Victor Glover")),class:o(["crew__nav-item",{"crew__nav-item_active":s.value.name==="Victor Glover"}]),role:"menuitem"},e[6]||(e[6]=[t("a",{class:"link",href:"#"},null,-1)]),2),t("li",{onClick:e[3]||(e[3]=n=>a("Anousheh Ansari")),class:o(["crew__nav-item",{"crew__nav-item_active":s.value.name==="Anousheh Ansari"}]),role:"menuitem"},e[7]||(e[7]=[t("a",{class:"link",href:"#"},null,-1)]),2)])])]),t("img",{class:"crew__image",src:d(s.value.images.webp),alt:""},null,8,B)]))]),_:1})])])]))}},M=v(H,[["__scopeId","data-v-c0a963e3"]]),S={class:"section crew"},T={__name:"CrewView",setup(w){return(l,s)=>(_(),c("div",S,[m(h),m(M)]))}},z=v(T,[["__scopeId","data-v-1408cac8"]]);export{z as default};
