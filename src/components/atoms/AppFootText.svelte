<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { rem, breakpoints, mq, square } from "../../../static/style/Base.js";

  //compornents

  //variables
  const timestamp = new Date();
  const year = timestamp.getFullYear();

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

<p class={copy}>
  <small>&copy; {year} Hello Noel</small>
</p>
