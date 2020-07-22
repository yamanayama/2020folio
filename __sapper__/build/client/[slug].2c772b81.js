import{S as s,i as a,s as t,a as e,e as o,t as i,K as r,f as n,g as l,c,b as p,d as m,h as d,H as h,k as u,l as f,m as x,n as v,o as $,C as g,I as w,M as j,O as k,p as E,J as H}from"./client.ea9120e2.js";import"./AppTwoColumnWide.1e442a18.js";import"./AppSlide.bc33849d.js";function I(s){let a,t,$,g,w,j,k,E,H,I,b=s[0].title+"",y=s[0].html+"";return document.title=a=s[0].title+" | murakami naomi's portfolio site",{c(){t=e(),$=o("div"),g=o("div"),w=o("h1"),j=i(b),k=e(),E=o("div"),this.h()},l(s){r('[data-svelte="svelte-pc3q98"]',document.head).forEach(n),t=l(s),$=c(s,"DIV",{class:!0});var a=p($);g=c(a,"DIV",{class:!0});var e=p(g);w=c(e,"H1",{});var o=p(w);j=m(o,b),o.forEach(n),k=l(e),E=c(e,"DIV",{class:!0}),p(E).forEach(n),e.forEach(n),a.forEach(n),this.h()},h(){d(E,"class","content svelte-gnxal1"),d(g,"class",H=h(s[2])+" svelte-gnxal1"),d($,"class",I=h(s[1])+" svelte-gnxal1")},m(s,a){u(s,t,a),u(s,$,a),f($,g),f(g,w),f(w,j),f(g,k),f(g,E),E.innerHTML=y},p(s,[t]){1&t&&a!==(a=s[0].title+" | murakami naomi's portfolio site")&&(document.title=a),1&t&&b!==(b=s[0].title+"")&&x(j,b),1&t&&y!==(y=s[0].html+"")&&(E.innerHTML=y)},i:v,o:v,d(s){s&&n(t),s&&n($)}}}async function b({params:s,query:a}){const t=await this.fetch(`work/${s.slug}.json`),e=await t.json();if(200===t.status)return{post:e};this.error(t.status,e.message)}function y(s,a,t){let{post:e}=a;const o=$`
		background: ${g.Gray200};
    ${w(13)};
	`,i=$`
		${j};
		${k};
    padding: 4rem 0;

		${E[1]} {
			padding-top: 80px;
      max-width: calc(${H[1]}px - 240px) ;
		}

		${E[1]} {
      max-width: ${H[2]}px;
		}
	`;$`

		${E[1]} {
		}
	`;return s.$set=(s=>{"post"in s&&t(0,e=s.post)}),[e,o,i]}export default class extends s{constructor(s){super(),a(this,s,y,I,t,{post:0})}}export{b as preload};
