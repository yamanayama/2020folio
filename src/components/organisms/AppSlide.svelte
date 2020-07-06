<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq } from "../../../static/style/Base.js";

  //compornents
  import AppSlideBlock from "../organisms/AppSlideBlock.svelte";

  //variables
  export let works = [];

  //style
  const slideBlock = css`
    ${mq[1]} {
    }
  `;
</script>

<div class={slideBlock}>
  <AppSlideBlock {works} />
</div>
