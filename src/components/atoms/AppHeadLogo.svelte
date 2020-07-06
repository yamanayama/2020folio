<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { rem, mq } from "../../../static/style/Base.js";

  //compornents
  import HeadLogo from "../../../static/images/common/logo.svg";

  //variables

  //style
  const logo = css`
    width: 108px;
    height: 40px;

    svg {
      width: 100%;
      height: 100%;
    }

    ${mq[1]} {
      width: 154px;
      height: 56px;
    }
  `;

  const logoTip = css`
    display: none;

    ${mq[1]} {
      display: block;
      ${rem(12)};
      font-family: ${Color.FontFamilyEng100};
    }
  `;

  const block = css`
    ${mq[1]} {
      margin-bottom: 18px;
    }
  `;
</script>

<div class={block}>
  <div class={logo}>
    <HeadLogo />
  </div>
  <aside class={logoTip}>Murakami Naomi’s portfolio</aside>
</div>
