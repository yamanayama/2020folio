import{S as s,i as t,s as i,e as a,t as o,a as c,c as e,b as r,d as l,f as n,g as d,h as p,j as h,k as g,l as m,m as x,n as b,o as f,p as u,C as $}from"./client.9955b796.js";function v(s){let t,i,f,u,$,v,y,w,E,I,W;return{c(){t=a("div"),i=a("div"),f=a("section"),u=a("h3"),$=o(s[1]),v=c(),y=o(s[3]),w=c(),E=a("div"),I=a("img"),this.h()},l(a){t=e(a,"DIV",{class:!0});var o=r(t);i=e(o,"DIV",{class:!0});var c=r(i);f=e(c,"SECTION",{class:!0});var p=r(f);u=e(p,"H3",{class:!0});var h=r(u);$=l(h,s[1]),h.forEach(n),v=d(p),y=l(p,s[3]),p.forEach(n),w=d(c),E=e(c,"DIV",{class:!0});var g=r(E);I=e(g,"IMG",{src:!0,alt:!0}),g.forEach(n),c.forEach(n),o.forEach(n),this.h()},h(){p(u,"class",h),p(f,"class",s[6]),I.src!==(W=s[0])&&p(I,"src",W),p(I,"alt",s[2]),p(E,"class",s[7]),p(i,"class",s[5]),p(t,"class",s[4])},m(s,a){g(s,t,a),m(t,i),m(i,f),m(f,u),m(u,$),m(f,v),m(f,y),m(i,w),m(i,E),m(E,I)},p(s,[t]){2&t&&x($,s[1]),8&t&&x(y,s[3]),1&t&&I.src!==(W=s[0])&&p(I,"src",W),4&t&&p(I,"alt",s[2])},i:b,o:b,d(s){s&&n(t)}}}function y(s,t,i){let{img:a=""}=t,{title:o=""}=t,{despriction:c=""}=t,{body:e=""}=t;const r=f`
    margin-bottom: 40px;

    ${u[1]} {
      margin-bottom: 240px;
    }

    ${u[2]} {
      margin-bottom: 320px;
    }

    &:nth-of-type(2) {
      .css-1tis47d {
        //苦渋の選択
        flex-direction: row-reverse;
        color: ${$.White};
      }

      ${u[1]} {
        .css-sb83h2{
          position: absolute;
          left: 0;
        }
      }

      .css-1fhl3r {
        background: ${$.Gray600};
        color: ${$.White};
      }

      .css-dwvb5m{
        color: ${$.White};
      }
    }
  `,l=f`
    ${u[1]} {
      display: flex;
      justify-content: space-between;
      align-items: start;
      position: relative;
    }
  `,n=f`
    text-align: left;
    padding: 16px 24px;

    ${u[1]} {
      padding: 48px 56px;
      background: ${$.White};
      width: 46%;
    }
  `,d=f`
    text-align: left;
    padding: 16px 24px;

    ${u[1]} {
      position: absolute;
      top: 40px;
      bottom: 0;
      right: 0;
      width: calc(64% - 16px);
      z-index: -1;

      img{
        width: 100%;
        height: auto;
      }
    }
  `;return s.$set=(s=>{"img"in s&&i(0,a=s.img),"title"in s&&i(1,o=s.title),"despriction"in s&&i(2,c=s.despriction),"body"in s&&i(3,e=s.body)}),[a,o,c,e,r,l,n,d]}class w extends s{constructor(s){super(),t(this,s,y,v,i,{img:0,title:1,despriction:2,body:3})}}export{w as A};
