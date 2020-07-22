<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96 } from "../../../static/style/Variables.js";

  export let value = "";
  export let placeholder = "";

  //style

  const text = css`
    background: ${Color.Gray200};
    line-height: 2;
    ${rem(13)};
    width: 100%;
    max-width: 560px;

    ${mq[1]}{
      ${rem(15)};
      height: 60px;
      padding-left: 17px;
    }
  `;
</script>

<style>
input, textarea {
  /* border: 1px solid #ccc; */
  border-radius: 0;
  transition-duration: 0.4s;
}
</style>

<input type="text" {value} {placeholder} class={text} />
