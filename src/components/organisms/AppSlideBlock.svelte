<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq } from "../../../static/style/Base.js";

  //compornents
  import AppSlideBody from "../molecules/AppSlideBody.svelte";
  import AppSlideImg from "../molecules/AppSlideImg.svelte";

  //variables
  export let works = [];

  //style
  const slideBox = css`
    display: grid;
    grid-template-columns: 1fr;

    ${mq[1]} {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }
  `;
</script>

<div class={slideBox}>
  {#each works as work (work.id)}
    <AppSlideBody {...work} />
  {/each}
</div>

<!-- <AppSlideImg {works} /> -->
