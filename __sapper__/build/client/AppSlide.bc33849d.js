import{S as t,i as s,s as e,e as a,c as r,b as n,f as l,h as o,k as i,n as c,o as h,q as f,a as u,r as m,g as $,u as g,l as p,v as d,w,x as y,t as b,d as x,m as k,p as v,y as E,z as N,A as I,B as L,D as B,E as D,F as V,G as A}from"./client.ea9120e2.js";function G(t){let s;return{c(){s=a("button"),this.h()},l(t){s=r(t,"BUTTON",{class:!0,type:!0,"aria-label":!0}),n(s).forEach(l),this.h()},h(){o(s,"class",t[2]),o(s,"type",t[0]),o(s,"aria-label",t[1])},m(t,e){i(t,s,e)},p(t,[e]){4&e&&o(s,"class",t[2]),1&e&&o(s,"type",t[0]),2&e&&o(s,"aria-label",t[1])},i:c,o:c,d(t){t&&l(s)}}}function P(t,s,e){let{type:a="button"}=s,{areaLabel:r=""}=s,{className:n="worksButtonPrev"}=s;h`
    list-style-type: none;
  `,h`
    list-style-type: none;
  `;return t.$set=(t=>{"type"in t&&e(0,a=t.type),"areaLabel"in t&&e(1,r=t.areaLabel),"className"in t&&e(2,n=t.className)}),[a,r,n]}class T extends t{constructor(t){super(),s(this,t,P,G,e,{type:0,areaLabel:1,className:2})}}function F(t){let s,e,h;const b=new T({props:{className:"worksButtonPrev",type:"button",areaLabel:"Previous"}}),x=new T({props:{className:"worksButtonNext",type:"button",areaLabel:"Next"}});return{c(){s=a("div"),f(b.$$.fragment),e=u(),f(x.$$.fragment),this.h()},l(t){s=r(t,"DIV",{class:!0});var a=n(s);m(b.$$.fragment,a),e=$(a),m(x.$$.fragment,a),a.forEach(l),this.h()},h(){o(s,"class",t[0])},m(t,a){i(t,s,a),g(b,s,null),p(s,e),g(x,s,null),h=!0},p:c,i(t){h||(d(b.$$.fragment,t),d(x.$$.fragment,t),h=!0)},o(t){w(b.$$.fragment,t),w(x.$$.fragment,t),h=!1},d(t){t&&l(s),y(b),y(x)}}}function M(t){return[h`
    display: flex;
  `]}class O extends t{constructor(t){super(),s(this,t,M,F,e,{})}}function S(t){let s,e,h,f,m,g,d,w,y,v,E,N;return{c(){s=a("section"),e=a("a"),h=a("h3"),f=b(t[1]),g=u(),d=a("figure"),w=a("img"),v=u(),E=a("div"),N=b(t[0]),this.h()},l(a){s=r(a,"SECTION",{class:!0});var o=n(s);e=r(o,"A",{class:!0,href:!0});var i=n(e);h=r(i,"H3",{class:!0});var c=n(h);f=x(c,t[1]),c.forEach(l),g=$(i),d=r(i,"FIGURE",{class:!0});var u=n(d);w=r(u,"IMG",{src:!0,alt:!0}),u.forEach(l),v=$(i),E=r(i,"DIV",{class:!0});var m=n(E);N=x(m,t[0]),m.forEach(l),i.forEach(l),o.forEach(l),this.h()},h(){o(h,"class",m=t[8]),w.src!==(y=t[2])&&o(w,"src",y),o(w,"alt",t[1]),o(d,"class",t[6]),o(E,"class",t[5]),o(e,"class",t[7]),o(e,"href",t[3]),o(s,"class",t[4])},m(t,a){i(t,s,a),p(s,e),p(e,h),p(h,f),p(e,g),p(e,d),p(d,w),p(e,v),p(e,E),p(E,N)},p(t,[s]){2&s&&k(f,t[1]),4&s&&w.src!==(y=t[2])&&o(w,"src",y),2&s&&o(w,"alt",t[1]),1&s&&k(N,t[0]),8&s&&o(e,"href",t[3])},i:c,o:c,d(t){t&&l(s)}}}function U(t,s,e){let{body:a=""}=s,{title:r=""}=s,{img:n=""}=s,{link:l=""}=s;const o=h``,i=h`
    order: 3;
  `,c=h`
    width: 100%;
    order: 1;
    heigth: auto;

    img{
      width: 100%;
      heigth: auto;
    }
  `,f=h`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1.875em 1.875em 0.875em;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    transition: all 0.4s ease-in-out;
    text-decoration: none;

    ${v[1]} {
      &:hover{
        transform: translateY(-15px);
      }
    }
  `,u=h`
    order: 2;
  `;return t.$set=(t=>{"body"in t&&e(0,a=t.body),"title"in t&&e(1,r=t.title),"img"in t&&e(2,n=t.img),"link"in t&&e(3,l=t.link)}),[a,r,n,l,o,i,c,f,u]}class j extends t{constructor(t){super(),s(this,t,U,S,e,{body:0,title:1,img:2,link:3})}}function q(t,s,e){const a=t.slice();return a[2]=s[e],a}function z(t,s){let e,a;const r=[s[2]];let n={};for(let t=0;t<r.length;t+=1)n=A(n,r[t]);const o=new j({props:n});return{key:t,first:null,c(){e=E(),f(o.$$.fragment),this.h()},l(t){e=E(),m(o.$$.fragment,t),this.h()},h(){this.first=e},m(t,s){i(t,e,s),g(o,t,s),a=!0},p(t,s){const e=1&s?N(r,[I(t[2])]):{};o.$set(e)},i(t){a||(d(o.$$.fragment,t),a=!0)},o(t){w(o.$$.fragment,t),a=!1},d(t){t&&l(e),y(o,t)}}}function C(t){let s,e,c=[],h=new Map,f=t[0];const u=t=>t[2].id;for(let s=0;s<f.length;s+=1){let e=q(t,f,s),a=u(e);h.set(a,c[s]=z(a,e))}return{c(){s=a("div");for(let t=0;t<c.length;t+=1)c[t].c();this.h()},l(t){s=r(t,"DIV",{class:!0});var e=n(s);for(let t=0;t<c.length;t+=1)c[t].l(e);e.forEach(l),this.h()},h(){o(s,"class",t[1])},m(t,a){i(t,s,a);for(let t=0;t<c.length;t+=1)c[t].m(s,null);e=!0},p(t,[e]){if(1&e){const a=t[0];L(),c=B(c,e,u,1,t,a,h,s,D,z,null,q),V()}},i(t){if(!e){for(let t=0;t<f.length;t+=1)d(c[t]);e=!0}},o(t){for(let t=0;t<c.length;t+=1)w(c[t]);e=!1},d(t){t&&l(s);for(let t=0;t<c.length;t+=1)c[t].d()}}}function H(t,s,e){let{works:a=[]}=s;const r=h`
    display: grid;
    grid-template-columns: 1fr;

    ${v[1]} {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }
  `;return t.$set=(t=>{"works"in t&&e(0,a=t.works)}),[a,r]}class R extends t{constructor(t){super(),s(this,t,H,C,e,{works:0})}}function Y(t){let s,e,c;const h=new R({props:{works:t[0]}}),b=new O({});return{c(){s=a("div"),f(h.$$.fragment),e=u(),f(b.$$.fragment),this.h()},l(t){s=r(t,"DIV",{class:!0});var a=n(s);m(h.$$.fragment,a),e=$(a),m(b.$$.fragment,a),a.forEach(l),this.h()},h(){o(s,"class",t[1])},m(t,a){i(t,s,a),g(h,s,null),p(s,e),g(b,s,null),c=!0},p(t,[s]){const e={};1&s&&(e.works=t[0]),h.$set(e)},i(t){c||(d(h.$$.fragment,t),d(b.$$.fragment,t),c=!0)},o(t){w(h.$$.fragment,t),w(b.$$.fragment,t),c=!1},d(t){t&&l(s),y(h),y(b)}}}function J(t,s,e){let{works:a=[]}=s;const r=h`
    ${v[1]} {
    }
  `;return t.$set=(t=>{"works"in t&&e(0,a=t.works)}),[a,r]}class K extends t{constructor(t){super(),s(this,t,J,Y,e,{works:0})}}export{K as A};
