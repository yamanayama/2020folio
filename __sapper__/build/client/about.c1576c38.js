import{S as t,i as s,s as a,e as l,t as e,c as i,b as r,d as o,f as n,h as c,k as d,l as h,m as p,n as f,o as g,I as m,C as u,p as $,y as x,q as b,r as v,u as E,z as w,A as I,v as y,w as S,x as D,B as T,D as k,E as C,F as V,G as M,a as H,g as L,j as N,K as O,M as P,O as W,J as j,P as A,Q as B,R as G}from"./client.9955b796.js";import"./AppSlide.3d0a48e7.js";function z(t){let s,a;return{c(){s=l("li"),a=e(t[0]),this.h()},l(l){s=i(l,"LI",{class:!0});var e=r(s);a=o(e,t[0]),e.forEach(n),this.h()},h(){c(s,"class",t[1])},m(t,l){d(t,s,l),h(s,a)},p(t,[s]){1&s&&p(a,t[0])},i:f,o:f,d(t){t&&n(s)}}}function U(t,s,a){let{label:l=""}=s;const e=g`
    ${m(10)};
    display: inline-block;
    background: ${u.Text100};
    color: ${u.White};
    padding: 4px 12px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;

    ${$[1]} {
      ${m(12)};
    }
  `;return t.$set=(t=>{"label"in t&&a(0,l=t.label)}),[l,e]}class R extends t{constructor(t){super(),s(this,t,U,z,a,{label:0})}}function F(t,s,a){const l=t.slice();return l[3]=s[a],l}function Q(t,s){let a,l;const e=[s[3]];let i={};for(let t=0;t<e.length;t+=1)i=M(i,e[t]);const r=new R({props:i});return{key:t,first:null,c(){a=x(),b(r.$$.fragment),this.h()},l(t){a=x(),v(r.$$.fragment,t),this.h()},h(){this.first=a},m(t,s){d(t,a,s),E(r,t,s),l=!0},p(t,s){const a=1&s?w(e,[I(t[3])]):{};r.$set(a)},i(t){l||(y(r.$$.fragment,t),l=!0)},o(t){S(r.$$.fragment,t),l=!1},d(t){t&&n(a),D(r,t)}}}function q(t){let s,a,e,o=[],p=new Map,f=t[0];const g=t=>t[3].id;for(let s=0;s<f.length;s+=1){let a=F(t,f,s),l=g(a);p.set(l,o[s]=Q(l,a))}return{c(){s=l("div"),a=l("ul");for(let t=0;t<o.length;t+=1)o[t].c();this.h()},l(t){s=i(t,"DIV",{class:!0});var l=r(s);a=i(l,"UL",{class:!0});var e=r(a);for(let t=0;t<o.length;t+=1)o[t].l(e);e.forEach(n),l.forEach(n),this.h()},h(){c(a,"class",t[2]),c(s,"class",t[1])},m(t,l){d(t,s,l),h(s,a);for(let t=0;t<o.length;t+=1)o[t].m(a,null);e=!0},p(t,[s]){if(1&s){const l=t[0];T(),o=k(o,s,g,1,t,l,p,a,C,Q,null,F),V()}},i(t){if(!e){for(let t=0;t<f.length;t+=1)y(o[t]);e=!0}},o(t){for(let t=0;t<o.length;t+=1)S(o[t]);e=!1},d(t){t&&n(s);for(let t=0;t<o.length;t+=1)o[t].d()}}}function J(t,s,a){let{tags:l=[]}=s;const e=g`
    margin-top: 16px;

    ${$[1]}{
      margin-top: 32px;
    }
  `,i=g`
    display: flex;
    flex-wrap: wrap;
  `;return t.$set=(t=>{"tags"in t&&a(0,l=t.tags)}),[l,e,i]}class K extends t{constructor(t){super(),s(this,t,J,q,a,{tags:0})}}function X(t){let s,a,f,g,m,u,$,x,w,I,T,k,C;const V=new K({props:{tags:t[4]}});return{c(){s=l("div"),a=l("div"),f=l("section"),g=l("h3"),m=e(t[1]),u=H(),$=l("div"),x=H(),b(V.$$.fragment),w=H(),I=l("div"),T=l("img"),this.h()},l(l){s=i(l,"DIV",{class:!0});var e=r(s);a=i(e,"DIV",{class:!0});var c=r(a);f=i(c,"SECTION",{class:!0});var d=r(f);g=i(d,"H3",{class:!0});var h=r(g);m=o(h,t[1]),h.forEach(n),u=L(d),$=i(d,"DIV",{class:!0}),r($).forEach(n),x=L(d),v(V.$$.fragment,d),d.forEach(n),w=L(c),I=i(c,"DIV",{class:!0});var p=r(I);T=i(p,"IMG",{src:!0,alt:!0}),p.forEach(n),c.forEach(n),e.forEach(n),this.h()},h(){c(g,"class",N),c($,"class",t[8]),c(f,"class",t[7]),T.src!==(k=t[0])&&c(T,"src",k),c(T,"alt",t[2]),c(I,"class",t[9]),c(a,"class",t[6]),c(s,"class",t[5])},m(l,e){d(l,s,e),h(s,a),h(a,f),h(f,g),h(g,m),h(f,u),h(f,$),$.innerHTML=t[3],h(f,x),E(V,f,null),h(a,w),h(a,I),h(I,T),C=!0},p(t,[s]){(!C||2&s)&&p(m,t[1]),(!C||8&s)&&($.innerHTML=t[3]),(!C||1&s&&T.src!==(k=t[0]))&&c(T,"src",k),(!C||4&s)&&c(T,"alt",t[2])},i(t){C||(y(V.$$.fragment,t),C=!0)},o(t){S(V.$$.fragment,t),C=!1},d(t){t&&n(s),D(V)}}}function _(t,s,a){let{img:l=""}=s,{title:e=""}=s,{despriction:i=""}=s,{body:r=""}=s;const o=g`
    margin-bottom: 40px;
		max-width: 980px;

    ${$[1]} {
    }

    ${$[2]} {
    }
    `,n=g`
    ${$[1]} {
      display: flex;
      justify-content: flex-end;
      align-items: start;
      position: relative;
    }
  `,c=g`
    text-align: left;
    padding: 16px 24px;

    ${$[1]} {
      padding: 48px 56px;
      width: 56%;
      position: relative;
      z-index: 2;
    }
  `,d=g`
    > p {
      margin-bottom: 1rem;
    }
  `,h=g`

    ${$[1]} {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: calc(64% - 16px);
      z-index: 1;
      background: ${u.White};

      img{
        width: 100%;
        height: auto;
      }
    }
  `;return t.$set=(t=>{"img"in t&&a(0,l=t.img),"title"in t&&a(1,e=t.title),"despriction"in t&&a(2,i=t.despriction),"body"in t&&a(3,r=t.body)}),[l,e,i,r,[{id:1,label:"Photoshop"},{id:2,label:"XD"},{id:3,label:"Figma"},{id:4,label:"Illustrator"},{id:5,label:"HTML/CSS"},{id:6,label:"Pug"},{id:7,label:"Sass"},{id:8,label:"Git"},{id:9,label:"Gulp"},{id:10,label:"jQuery"},{id:11,label:"WordPress"},{id:12,label:"React"},{id:13,label:"Vue(Nuxt)"},{id:14,label:"Svlete"},{id:15,label:"SpriteStudio"}],o,n,c,d,h]}class Y extends t{constructor(t){super(),s(this,t,_,X,a,{img:0,title:1,despriction:2,body:3})}}function Z(t,s,a){const l=t.slice();return l[13]=s[a],l}function tt(t,s,a){const l=t.slice();return l[10]=s[a],l}function st(t,s){let a,l;const e=[s[10]];let i={};for(let t=0;t<e.length;t+=1)i=M(i,e[t]);const r=new Y({props:i});return{key:t,first:null,c(){a=x(),b(r.$$.fragment),this.h()},l(t){a=x(),v(r.$$.fragment,t),this.h()},h(){this.first=a},m(t,s){d(t,a,s),E(r,t,s),l=!0},p(t,s){const a=1&s?w(e,[I(t[10])]):{};r.$set(a)},i(t){l||(y(r.$$.fragment,t),l=!0)},o(t){S(r.$$.fragment,t),l=!1},d(t){t&&n(a),D(r,t)}}}function at(t,s){let a,p,g,m,u,$=s[13].time+"",x=s[13].body+"";return{key:t,first:null,c(){a=l("dl"),p=l("dd"),g=e($),m=l("dt"),u=e(x),this.h()},l(t){a=i(t,"DL",{class:!0});var s=r(a);p=i(s,"DD",{});var l=r(p);g=o(l,$),l.forEach(n),m=i(s,"DT",{});var e=r(m);u=o(e,x),e.forEach(n),s.forEach(n),this.h()},h(){c(a,"class",s[9]),this.first=a},m(t,s){d(t,a,s),h(a,p),h(p,g),h(a,m),h(m,u)},p:f,d(t){t&&n(a)}}}function lt(t){let s,a,p,f,g,m,u,$,x,b,v,E,w,I,D,M,P,W,j,z,U,R,F,Q,q,J,K,X,_,Y=[],lt=new Map,et=[],it=new Map,rt=t[0];const ot=t=>t[10].id;for(let s=0;s<rt.length;s+=1){let a=tt(t,rt,s),l=ot(a);lt.set(l,Y[s]=st(l,a))}let nt=t[1];const ct=t=>t[13].id;for(let s=0;s<nt.length;s+=1){let a=Z(t,nt,s),l=ct(a);it.set(l,et[s]=at(l,a))}return{c(){s=H(),a=l("div"),p=l("div"),f=l("section"),g=l("h1"),m=e("about"),u=H(),$=l("section"),x=l("h2"),b=e("portfolio widh Svelte"),v=H(),E=l("p"),w=e("こちらは村上奈緒美のポートフォリオです。"),I=H(),D=l("p"),M=e("最近の活動記録など載せています。"),P=H(),W=l("div"),j=l("section"),z=l("h2"),U=e("profile"),R=H();for(let t=0;t<Y.length;t+=1)Y[t].c();F=H(),Q=l("section"),q=l("h2"),J=e("登壇履歴"),K=H(),X=l("section");for(let t=0;t<et.length;t+=1)et[t].c();this.h()},l(t){O('[data-svelte="svelte-en64lu"]',document.head).forEach(n),s=L(t),a=i(t,"DIV",{class:!0});var l=r(a);p=i(l,"DIV",{class:!0});var e=r(p);f=i(e,"SECTION",{class:!0});var c=r(f);g=i(c,"H1",{class:!0});var d=r(g);m=o(d,"about"),d.forEach(n),u=L(c),$=i(c,"SECTION",{class:!0});var h=r($);x=i(h,"H2",{class:!0});var y=r(x);b=o(y,"portfolio widh Svelte"),y.forEach(n),v=L(h),E=i(h,"P",{});var S=r(E);w=o(S,"こちらは村上奈緒美のポートフォリオです。"),S.forEach(n),I=L(h),D=i(h,"P",{});var T=r(D);M=o(T,"最近の活動記録など載せています。"),T.forEach(n),h.forEach(n),c.forEach(n),P=L(e),W=i(e,"DIV",{class:!0});var k=r(W);j=i(k,"SECTION",{class:!0});var C=r(j);z=i(C,"H2",{class:!0});var V=r(z);U=o(V,"profile"),V.forEach(n),R=L(C);for(let t=0;t<Y.length;t+=1)Y[t].l(C);C.forEach(n),k.forEach(n),F=L(e),Q=i(e,"SECTION",{class:!0});var H=r(Q);q=i(H,"H2",{class:!0});var N=r(q);J=o(N,"登壇履歴"),N.forEach(n),K=L(H),X=i(H,"SECTION",{class:!0});var A=r(X);for(let t=0;t<et.length;t+=1)et[t].l(A);A.forEach(n),H.forEach(n),e.forEach(n),l.forEach(n),this.h()},h(){document.title="About | murakami naomi's portfolio site",c(g,"class",A),c(x,"class",N),c($,"class",t[5]),c(f,"class",t[4]),c(z,"class",A),c(j,"class",t[10]),c(W,"class",t[6]),c(q,"class",B),c(X,"class",t[8]),c(Q,"class",t[7]),c(p,"class",t[3]),c(a,"class",t[2])},m(t,l){d(t,s,l),d(t,a,l),h(a,p),h(p,f),h(f,g),h(g,m),h(f,u),h(f,$),h($,x),h(x,b),h($,v),h($,E),h(E,w),h($,I),h($,D),h(D,M),h(p,P),h(p,W),h(W,j),h(j,z),h(z,U),h(j,R);for(let t=0;t<Y.length;t+=1)Y[t].m(j,null);h(p,F),h(p,Q),h(Q,q),h(q,J),h(Q,K),h(Q,X);for(let t=0;t<et.length;t+=1)et[t].m(X,null);_=!0},p(t,[s]){if(1&s){const a=t[0];T(),Y=k(Y,s,ot,1,t,a,lt,j,C,st,null,tt),V()}if(514&s){const a=t[1];et=k(et,s,ct,1,t,a,it,X,G,at,null,Z)}},i(t){if(!_){for(let t=0;t<rt.length;t+=1)y(Y[t]);_=!0}},o(t){for(let t=0;t<Y.length;t+=1)S(Y[t]);_=!1},d(t){t&&n(s),t&&n(a);for(let t=0;t<Y.length;t+=1)Y[t].d();for(let t=0;t<et.length;t+=1)et[t].d()}}}let et="2020年";function it(t){let s=[{id:1,img:"../images/about/prof_img01.jpg",title:"村上 奈緒美",despriction:"村上 奈緒美 WEB/UIデザイナー",body:"<p>一般職、ゲームイラストレーターを経てWEB業界へきました。<br>\n\t\t\t\t受託制作会社でWEBデザイナー・コーダー・ディレクター兼任後、インハウスのUIデザイナーとして働いています。</p><p>普段はGAなどのデータ分析をもとに、WEBサービスのUI開発でLPOやABテストを行うことで、PDCAを回しています。</p><p>マークアップ（CSS,アニメーション）が得意で、趣味はフロンエンドの個人開発です。Vue(Nuxt),Reactチョットデキル。</p>"}],a=[{id:1,title:et,time:"2020/01/19",body:"ヤフー名古屋 TechMeetup デザインを語ろう"},{id:2,title:et,time:"2020/02/15",body:"バナーワークショップ 現役デザイナーに学ぶ　魅力的なバナーの作り方"},{id:3,title:et,time:"2020/06/01",body:"なごやデザイナーLT大会"}];const l=g`
		background: ${u.Gray200};
    ${m(13)};
	`,e=g`
		${P};
		${W};
    padding: 4rem 0;

		${$[1]} {
			padding-top: 80px;
      max-width: ${j[2]}px;
		}
	`,i=g`
		margin-bottom: 24px;

		${$[1]} {
			max-width: ${j[1]}px;
			margin-bottom: 40px;
		}
	`,r=g`
		background: ${u.White};
		padding: 16px 24px;

		${$[1]} {
			max-width: ${j[1]}px;
			padding: 48px 56px;
			${m(14)};
		}
	`,o=g`
		padding: 16px 0 0;

		${$[1]} {
			max-width: ${j[2]}px;
			padding: 48px 0 0;
			${m(14)};
		}
	`,n=g`
    position: relative;
    overflow: hidden;
  `;g`
    padding: 4rem 0;

    ${$[1]} {
      padding: 40px 0;
      ${m(14)};
    }
  `,g`
    position: absolute;
    top: 80px;
    left: 0;
    height: 100%;
		z-index: -10;
	`;return[s,a,l,e,i,r,o,g`
    margin-bottom: 24px;

		${$[1]} {
			max-width: ${j[1]}px;
			margin-bottom: 40px;
		}
	`,g`
		margin-top: 24px;
	`,g`
		margin-top: 8px;

		${$[1]}{
			display: flex;
		}

		dd {
     margin-right: 2rem;
		}
	`,n]}export default class extends t{constructor(t){super(),s(this,t,it,lt,a,{})}}
