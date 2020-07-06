<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../static/style/Base.js";
  import { center, secP, sp96, leftP } from "../../static/style/Variables.js";
  import { display1, display2 } from "../../static/style/Title.js";

  //compornents
  // import AppTitle from "../components/atoms/itle.svelte";
  import AppTwoColumnWide from "../components/organisms/AppTwoColumnWide.svelte";
  import AppSlide from "../components/organisms/AppSlide.svelte";
  import AppCvButton from "../components/atoms/AppCvButton.svelte";

  //variables

  let points = [
    {
      id: 1,
      img: "../../static/images/point/point_img01.png",
      title: "UI/UX",
      despriction: "UI/UX",
      body:
        "ワイヤー制作、UI設計、ユーザーインタビュー、LPO、デザインガイドライン作成など幅広く対応できます。受託制作でCMSデザインを経験し、インハウスでサービスUI、LPOでPDCAを回しながら、スタートアップならではDPCAも展開中です。UX勉強中。"
    },
    {
      id: 2,
      img: "../../static/images/point/point_img02.png",
      title: "frontend",
      despriction: "frontend",
      body:
        "マークアップ、スタイルからCSSアニメーション、JSフレームワーク制作まで行います。セマンティックで秩序あるコーディングを行います。アクセシビリティやりたい勢です。"
    },
    {
      id: 3,
      img: "../../static/images/point/point_img03.png",
      title: "marketing",
      despriction: "marketing",
      body: "GAなどの解析"
    }
  ];

  let works = [
    {
      id: Math.random(),
      img: "../../static/images/works/works_img01",
      title: "hogehoge",
      despriction: "UI/UX",
      body: "hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge"
    },
    {
      id: Math.random(),
      img: "../../static/images/works/works_img02",
      title: "芝助",
      despriction: "芝助",
      body: "芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助芝助"
    },
    {
      id: Math.random(),
      img: "../../static/images/works/works_img03",
      title: "UI/UX",
      despriction: "UI/UX",
      body:
        "ワイヤー制作、UI設計、ユーザーインタビュー、LPO、デザインガイドライン作成など幅広く対応できます。受託制作でCMSデザインを経験し、インハウスでサービスUI、LPOでPDCAを回しながら、スタートアップならではDPCAも展開中です。UX勉強中。"
    }
  ];
  //style

  //animation
  const scrollBar = keyframes`
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(40px,0);
      opacity: 0;
  `;

  //hero
  const hero = css`
    ${leftP};
    background: ${Color.Gray500};
    height: 90vh;
    position: relative;
  `;

  const heroImg = css`
    width: 72vmin;
    height: 120vmin;
    border: 4px solid ${Color.White};
    margin: auto;
    ${center("xy")};

    ${mq[1]} {
      width: 40vmin;
      height: 68vmin;
    }
  `;

  const heroBody = css`
    text-align: left;
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    ${rem(10)};
    font-family: ${Color.FontFamilyEng100};

    ${mq[1]} {
      left: -12vmin;
      bottom: -2rem;
    }
  `;

  function scrollLine(bg = Color.Text100, left = "3rem") {
    return {
      content: "''",
      width: "80px",
      height: "1px",
      position: "absolute",
      top: "14px",
      left: left,
      background: bg
    };
  }

  const scroll = css`
    transform: rotate(90deg);
    position: absolute;
    right: 8px;
    bottom 80px;
    ${rem(14)};
    font-family: ${Color.FontFamilyEng100};
    text-transform: capitalize;
    font-weight: bold;

    &::after{
      ${scrollLine(Color.Text100, "3rem")};
      animation: ${scrollBar} 1.2s infinite;
    }
  `;

  //vision
  const vision = css`
    ${sp96};
    padding: 4rem 0;
    position: relative;
    ${leftP};

    ${mq[1]} {
      max-width: ${breakpoints[2]}px;
      padding: 120px 0;
      display: flex;
      justify-content: space-between;
    }

    &::before {
      content: "portfolio";
      position: absolute;
      top: -8px;
      right: 0;
      text-transform: uppercase;
      font-weight: bold;
      color: ${Color.Gray200};
      z-index: -1;
      ${rem(40)};
      line-height: 1;

      ${mq[1]} {
        ${rem(80)};
        top: -18px;
      }
    }
  `;

  const visionCopy = css`
    line-height: 1;
    ${rem(60)};
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 2rem;
    width: 48%;

    ${mq[1]} {
      ${rem(140)};
    }
  `;

  //point
  const point = css`
    position: relative;
    overflow: hidden;
  `;

  const pointBlock = css`
    ${sp96};
    padding: 4rem 0;
    ${leftP};

    ${mq[1]} {
      max-width: ${breakpoints[2]}px;
      padding: 120px 0;
    }
  `;

  const pointBackground = css`
    position: absolute;
    top: 80px;
    left: 0;
    width: 50%;
    background-color: #f2f3f4;
    height: 100%;
    z-index: -10;
  `;

  //works
  const work = css`
    width: 100%;
  `;

  const workWrap = css`
    ${sp96};
    ${leftP};
    padding: 4rem 0;

    ${mq[1]} {
      max-width: ${breakpoints[2]}px;
      padding: 120px 0;
    }
  `;
</script>

<style>
  .visionBlock {
    width: 42%;
  }

  .visionTitle {
    margin-bottom: 1rem;
  }
  .visionBody p {
    margin-bottom: 1rem;
  }
</style>

<svelte:head>
  <title>Hello Noel | murakami naomi's portfolio site</title>
</svelte:head>

<div class={hero}>
  <div class={heroImg}>
    <p class={heroBody}>
      Web/UI Design,
      <br />
      UX,
      <br />
      Frontend,
      <br />
      Illustration
    </p>
  </div>
  <div class={scroll}>scroll</div>
</div>

<div class={vision}>
  <div class={visionCopy}>
    my
    <br />
    vision
  </div>
  <section class="visionBlock">
    <!-- <AppTitle heading="h2" className="display2" class={visionTitle}>
      サービスと技術を繋ぐ
      <br />
      ヒトとモノを繋ぐ
    </AppTitle> -->
    <h2 class="visionTitle #{display1}">
      サービスと技術を繋ぐ
      <br />
      ヒトとモノを繋ぐ
    </h2>
    <div class="visionBody">
      <p>aaaaaaaaaaaaaaaaaa</p>
      <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      <p>
        aaaaaaaaaaaaaaaaaaaaaaaab
        <br />
        aaaaaaaaaaaa
      </p>
    </div>
  </section>
</div>

<div class={point}>
  <div class={pointBackground} />
  <section class={pointBlock}>
    <h2 class={display2}>skills</h2>

    {#each points as point (point.id)}
      <AppTwoColumnWide {...point} />
    {/each}
  </section>
</div>

<div class={work}>
  <section class={workWrap}>
    <h2 class={display2}>works</h2>
    <AppSlide {works} />
  </section>
</div>
