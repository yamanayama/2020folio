<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../static/style/Base.js";
  import { center, secP, sp96 } from "../../static/style/Variables.js";

  //compornents
  import {display1} from "../../components/atoms/AppTitle.svelte";

  //variables

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
    margin-left: 16px;
    background: ${Color.Gray500};
    height: 90vh;
    position: relative;
    ${mq[1]} {
      margin-left: 100px;
    }
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
    display: flex;
    justify-content: space-between;
    position: relative;

    &::before {
      content: "portfolio";
      position: absolute;
      top: -14px;
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

    ${mq[1]} {
      max-width: ${breakpoints[2]}px;
      padding: 120px 0;
    }
  `;

  const visionCopy = css`
    line-height: 1;
    ${rem(60)};
    text-transform: uppercase;
    font-weight: bold;

    ${mq[1]} {
      ${rem(140)};
    }
  `;

  const visionBlock = css`
    display: flex;
    justfy-content: space-between;
  `;

  const visionTitle = css`
    display: flex;
    justfy-content: space-between;
  `;

  const visionBody = css`
    display: flex;
    justfy-content: space-between;
  `;
</script>

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
  <div class={visionBlock}>
    <p class={visionTitle} {display1}>
      サービスと技術を繋ぐ
      <br />
      ヒトとモノを繋ぐ
    </p>
    <div class={visionBody}>
      my
      <br />
      vision
    </div>
  </div>
</div>
