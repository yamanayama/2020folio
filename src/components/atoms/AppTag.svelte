<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";

  //compornents

  //variables
  export let label = "";

  //style
  const tagItem = css`
    ${rem(10)};
    display: inline-block;
    background: ${Color.Text100};
    color: ${Color.White};
    padding: 4px 12px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;

    ${mq[1]} {
      ${rem(12)};
    }
  `;
</script>

<li class={tagItem}>
  {label}
</li>
