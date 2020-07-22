import{S as a,i as e,s as t,e as s,c as l,h as n,H as r,k as o,n as c,f as h,o as i,C as u,I as p,p as d,q as m,b as f,r as $,u as x,v,w as g,x as w,J as y}from"./client.ea9120e2.js";function b(a){let e,t;return{c(){e=s("input"),this.h()},l(a){e=l(a,"INPUT",{type:!0,value:!0,placeholder:!0,class:!0}),this.h()},h(){n(e,"type","text"),e.value=a[0],n(e,"placeholder",a[1]),n(e,"class",t=r(a[2])+" svelte-1u1t0uw")},m(a,t){o(a,e,t)},p(a,[t]){1&t&&e.value!==a[0]&&(e.value=a[0]),2&t&&n(e,"placeholder",a[1])},i:c,o:c,d(a){a&&h(e)}}}function k(a,e,t){let{value:s=""}=e,{placeholder:l=""}=e;const n=i`
    background: ${u.Gray200};
    line-height: 2;
    ${p(13)};
    width: 100%;
    max-width: 560px;

    ${d[1]}{
      ${p(15)};
      height: 60px;
      padding-left: 17px;
    }
  `;return a.$set=(a=>{"value"in a&&t(0,s=a.value),"placeholder"in a&&t(1,l=a.placeholder)}),[s,l,n]}class I extends a{constructor(a){super(),e(this,a,k,b,t,{value:0,placeholder:1})}}function O(a){let e,t;const r=new I({});return{c(){e=s("form"),m(r.$$.fragment),this.h()},l(a){e=l(a,"FORM",{name:!0,method:!0,netlify:!0,class:!0});var t=f(e);$(r.$$.fragment,t),t.forEach(h),this.h()},h(){n(e,"name","contact"),n(e,"method","POST"),n(e,"netlify",""),n(e,"class",a[0])},m(a,s){o(a,e,s),x(r,e,null),t=!0},p:c,i(a){t||(v(r.$$.fragment,a),t=!0)},o(a){g(r.$$.fragment,a),t=!1},d(a){a&&h(e),w(r)}}}function P(a){return[i`
      margin-bottom: 24px;

		${d[1]} {
			max-width: ${y[1]}px;
			margin-bottom: 40px;
		}
  `]}class S extends a{constructor(a){super(),e(this,a,P,O,t,{})}}export{S as A};
