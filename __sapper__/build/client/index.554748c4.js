import{S as t,i as a,s,e as r,t as e,a as l,c as o,b as i,d as c,f as n,g as d,h,k as u,l as p,m as g,K as m,n as f,T as $,o as x,C as w,I as v,M as E,O as k,p as I,J as b,P as y}from"./client.ea9120e2.js";import"./AppTwoColumnWide.1e442a18.js";import"./AppSlide.bc33849d.js";function j(t,a,s){const r=t.slice();return r[15]=a[s],r}function D(t){let a,s;return{c(){a=r("li"),s=e("loading...")},l(t){a=o(t,"LI",{});var r=i(a);s=c(r,"loading..."),r.forEach(n)},m(t,r){u(t,a,r),p(a,s)},d(t){t&&n(a)}}}function T(t){let a,s,m,f,$,x,w,v,E,k,I,b,y,j,D,T=t[15].title+"",V=t[15].despriction+"";return{c(){a=r("li"),s=r("a"),m=r("h3"),f=e(T),x=l(),w=r("figure"),v=r("img"),I=l(),b=r("div"),y=e(V),D=l(),this.h()},l(t){a=o(t,"LI",{class:!0});var r=i(a);s=o(r,"A",{class:!0,href:!0,rel:!0});var e=i(s);m=o(e,"H3",{class:!0});var l=i(m);f=c(l,T),l.forEach(n),x=d(e),w=o(e,"FIGURE",{class:!0});var h=i(w);v=o(h,"IMG",{src:!0,alt:!0}),h.forEach(n),I=d(e),b=o(e,"DIV",{class:!0});var u=i(b);y=c(u,V),u.forEach(n),e.forEach(n),D=d(r),r.forEach(n),this.h()},h(){h(m,"class",$=t[9]),v.src!==(E=t[15].thum)&&h(v,"src",E),h(v,"alt",k=t[15].title),h(w,"class",t[7]),h(b,"class",t[6]),h(s,"class",t[8]),h(s,"href",j="work/"+t[15].slug),h(s,"rel","prefetch"),h(a,"class",t[5])},m(t,r){u(t,a,r),p(a,s),p(s,m),p(m,f),p(s,x),p(s,w),p(w,v),p(s,I),p(s,b),p(b,y),p(a,D)},p(t,a){1&a&&T!==(T=t[15].title+"")&&g(f,T),1&a&&v.src!==(E=t[15].thum)&&h(v,"src",E),1&a&&k!==(k=t[15].title)&&h(v,"alt",k),1&a&&V!==(V=t[15].despriction+"")&&g(y,V),1&a&&j!==(j="work/"+t[15].slug)&&h(s,"href",j)},d(t){t&&n(a)}}}function V(t){let a,s,g,x,w,v,E,k,I=t[0],b=[];for(let a=0;a<I.length;a+=1)b[a]=T(j(t,I,a));let V=null;return I.length||(V=D()),{c(){a=l(),s=r("div"),g=r("div"),x=r("h1"),w=e("work"),v=l(),E=r("div"),k=r("ul");for(let t=0;t<b.length;t+=1)b[t].c();V&&V.c(),this.h()},l(t){m('[data-svelte="svelte-cnqda3"]',document.head).forEach(n),a=d(t),s=o(t,"DIV",{class:!0});var r=i(s);g=o(r,"DIV",{class:!0});var e=i(g);x=o(e,"H1",{class:!0});var l=i(x);w=c(l,"work"),l.forEach(n),v=d(e),E=o(e,"DIV",{class:!0});var h=i(E);k=o(h,"UL",{class:!0});var u=i(k);for(let t=0;t<b.length;t+=1)b[t].l(u);V&&V.l(u),u.forEach(n),h.forEach(n),e.forEach(n),r.forEach(n),this.h()},h(){document.title="Work | murakami naomi's portfolio site",h(x,"class",y),h(k,"class",t[4]),h(E,"class",t[3]),h(g,"class",t[2]),h(s,"class",t[1])},m(t,r){u(t,a,r),u(t,s,r),p(s,g),p(g,x),p(x,w),p(g,v),p(g,E),p(E,k);for(let t=0;t<b.length;t+=1)b[t].m(k,null);V&&V.m(k,null)},p(t,[a]){if(993&a){let s;for(I=t[0],s=0;s<I.length;s+=1){const r=j(t,I,s);b[s]?b[s].p(r,a):(b[s]=T(r),b[s].c(),b[s].m(k,null))}for(;s<b.length;s+=1)b[s].d(1);b.length=I.length,I.length?V&&(V.d(1),V=null):V||((V=D()).c(),V.m(k,null))}},i:f,o:f,d(t){t&&n(a),t&&n(s),$(b,t),V&&V.d()}}}function A({params:t,query:a}){return this.fetch("work.json").then(t=>t.json()).then(t=>({posts:t}))}function G(t,a,s){let{posts:r}=a;const e=x`
		background: ${w.Gray200};
    ${v(13)};
	`,l=x`
		${E};
		${k};
    padding: 4rem 0;

		${I[1]} {
			padding-top: 80px;
      max-width: calc(${b[1]}px - 240px) ;
		}

		${I[1]} {
      max-width: ${b[2]}px;
		}
	`,o=x`

		${I[1]} {
		}
	`,i=x`
		list-style: none;
		display: grid;
		grid-gap: 8px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;

		${I[1]} {
			${v(14)};
			grid-gap: 16px;
			grid-auto-rows: 240px;
    	grid-template-columns: repeat(auto-fill, 240px);
		}

		${I[2]} {
			max-width: ${b[2]}px;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: auto;
		}
	`,c=x`
		font-size: ${v[14]};
		background: ${w.White};
	`,n=x`
		grid-column: 1/3;
		grid-row: auto;
	`,d=(x`
		${n};
		${I[1]} {
			grid-column: 1 / 3;
			grid-row: 1 / 3;
		}
	`,x`
		${n};
		${I[1]} {
			grid-column: 3 / 5;
		}
	`,x`
		${n};
		${I[1]} {
			grid-column: 4 / 5;
			grid-row: 3 / 5;
		}
	`,x`
		${n};
		${I[1]} {
			grid-column: 2 / 4;
		}
	`,x`
    order: 3;
  `),h=x`
    width: 100%;
    order: 1;
    heigth: auto;

    img{
      width: 100%;
      heigth: auto;
    }
  `,u=x`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1em 1em 0.5em;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    transition: all 0.1s ease-in-out;
    text-decoration: none;

    ${I[1]} {
    	padding: 1.875em 1.875em 0.875em;

      &:hover{
        opacity: 0.7;
      }
    }
  `,p=x`
		order: 2;
		${v(13)};

		${I[1]} {
			${v(16)};
    }
  `;return t.$set=(t=>{"posts"in t&&s(0,r=t.posts)}),[r,e,l,o,i,c,d,h,u,p,n]}export default class extends t{constructor(t){super(),a(this,t,G,V,s,{posts:0,largeT:10})}get largeT(){return this.$$.ctx[10]}}export{A as preload};
