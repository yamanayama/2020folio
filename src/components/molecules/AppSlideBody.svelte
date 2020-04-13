<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { mainHeading } from "../../../static/style/Title.js";

  //compornents

  //variables
  export let body = "";
  export let title = "";

  //style
  const itemBlock = css`
    ${mq[1]} {
      width: 48%;
    }
  `;

  const itemText = css`
    ${mq[1]} {
      width: 48%;
    }
  `;
</script>

<section class={itemBlock}>
  <h3 class={mainHeading}>{title}</h3>
  <div class={itemText}>{body}</div>
</section>
