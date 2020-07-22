import{S as s,i as t,s as a,e as i,t as o,a as e,c,b as r,d as l,f as n,g as d,h as p,j as h,k as g,l as m,m as x,n as f,o as b,p as u,C as $}from"./client.ea9120e2.js";function v(s){let t,a,b,u,$,v,y,w,E,I,W;return{c(){t=i("div"),a=i("div"),b=i("section"),u=i("h3"),$=o(s[1]),v=e(),y=o(s[3]),w=e(),E=i("div"),I=i("img"),this.h()},l(i){t=c(i,"DIV",{class:!0});var o=r(t);a=c(o,"DIV",{class:!0});var e=r(a);b=c(e,"SECTION",{class:!0});var p=r(b);u=c(p,"H3",{class:!0});var h=r(u);$=l(h,s[1]),h.forEach(n),v=d(p),y=l(p,s[3]),p.forEach(n),w=d(e),E=c(e,"DIV",{class:!0});var g=r(E);I=c(g,"IMG",{src:!0,alt:!0}),g.forEach(n),e.forEach(n),o.forEach(n),this.h()},h(){p(u,"class",h),p(b,"class",s[6]),I.src!==(W=s[0])&&p(I,"src",W),p(I,"alt",s[2]),p(E,"class",s[7]),p(a,"class",s[5]),p(t,"class",s[4])},m(s,i){g(s,t,i),m(t,a),m(a,b),m(b,u),m(u,$),m(b,v),m(b,y),m(a,w),m(a,E),m(E,I)},p(s,[t]){2&t&&x($,s[1]),8&t&&x(y,s[3]),1&t&&I.src!==(W=s[0])&&p(I,"src",W),4&t&&p(I,"alt",s[2])},i:f,o:f,d(s){s&&n(t)}}}function y(s,t,a){let{img:i=""}=t,{title:o=""}=t,{despriction:e=""}=t,{body:c=""}=t;const r=b`
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
  `,l=b`
    ${u[1]} {
      display: flex;
      justify-content: space-between;
      align-items: start;
      position: relative;
    }
  `,n=b`
    text-align: left;
    padding: 16px 24px;

    ${u[1]} {
      padding: 48px 56px;
      background: ${$.White};
      width: 46%;
    }
  `,d=b`
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
  `;return s.$set=(s=>{"img"in s&&a(0,i=s.img),"title"in s&&a(1,o=s.title),"despriction"in s&&a(2,e=s.despriction),"body"in s&&a(3,c=s.body)}),[i,o,e,c,r,l,n,d]}class w extends s{constructor(s){super(),t(this,s,y,v,a,{img:0,title:1,despriction:2,body:3})}}export{w as A};
