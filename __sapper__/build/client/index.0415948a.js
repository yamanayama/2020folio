import{S as s,i as t,s as e,e as a,t as l,c as r,b as o,d as n,f as i,h,k as f,l as p,m as c,a as d,K as m,g as u,n as g,T as b,o as v,M as x,O as j,p as E,J as $}from"./client.ea9120e2.js";import"./AppTwoColumnWide.1e442a18.js";import"./AppSlide.bc33849d.js";import"./AppForm.d7b2428b.js";import{g as A}from"./cms.32c5939e.js";function k(s,t,e){const a=s.slice();return a[2]=t[e],a}function w(s){let t,e,d,m,u=s[2].fields.title+"";return{c(){t=a("li"),e=a("a"),d=l(u),this.h()},l(s){t=r(s,"LI",{});var a=o(t);e=r(a,"A",{rel:!0,href:!0});var l=o(e);d=n(l,u),l.forEach(i),a.forEach(i),this.h()},h(){h(e,"rel","prefetch"),h(e,"href",m=s[2].fields.slug)},m(s,a){f(s,t,a),p(t,e),p(e,d)},p(s,t){1&t&&u!==(u=s[2].fields.title+"")&&c(d,u),1&t&&m!==(m=s[2].fields.slug)&&h(e,"href",m)},d(s){s&&i(t)}}}function L(s){let t,e,c,v,x,j=s[0],E=[];for(let t=0;t<j.length;t+=1)E[t]=w(k(s,j,t));return{c(){t=d(),e=a("h1"),c=l("blog"),v=d(),x=a("ul");for(let s=0;s<E.length;s+=1)E[s].c();this.h()},l(s){m('[data-svelte="svelte-1r5gse2"]',document.head).forEach(i),t=u(s),e=r(s,"H1",{});var a=o(e);c=n(a,"blog"),a.forEach(i),v=u(s),x=r(s,"UL",{class:!0});var l=o(x);for(let s=0;s<E.length;s+=1)E[s].l(l);l.forEach(i),this.h()},h(){document.title="blog | murakami naomi's portfolio site",h(x,"class","svelte-1frg2tf")},m(s,a){f(s,t,a),f(s,e,a),p(e,c),f(s,v,a),f(s,x,a);for(let s=0;s<E.length;s+=1)E[s].m(x,null)},p(s,[t]){if(1&t){let e;for(j=s[0],e=0;e<j.length;e+=1){const a=k(s,j,e);E[e]?E[e].p(a,t):(E[e]=w(a),E[e].c(),E[e].m(x,null))}for(;e<E.length;e+=1)E[e].d(1);E.length=j.length}},i:g,o:g,d(s){s&&i(t),s&&i(e),s&&i(v),s&&i(x),b(E,s)}}}function S({params:s,query:t}){return A().then(s=>({posts:s}))}function T(s,t,e){let{posts:a}=t;v`
		${x};
		${j};
    padding: 4rem 0;

		${E[1]} {
			padding-top: 80px;
      max-width: ${$[2]}px;
		}
	`;return s.$set=(s=>{"posts"in s&&e(0,a=s.posts)}),[a]}export default class extends s{constructor(s){super(),t(this,s,T,L,e,{posts:0})}}export{S as preload};
