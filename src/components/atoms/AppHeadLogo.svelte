<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { rem } from "../../../static/style/Base.js";

  //compornents
  import HeadLogo from "../../../static/image/common/logo.svg";

  //variables

  //style
  const copy = css`
    font-size: ${rem(10)};
    color: ${Color.White};
    text-align: center;
    font-weight: 600;
    font-family: ${Color.FontFamilyEng100};
    letter-spacing: 0.2em;
  `;
</script>

<figure>
  {@html HeadLogo}
</figure>
