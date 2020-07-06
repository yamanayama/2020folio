<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq } from "../../../static/style/Base.js";

  //compornents
  import AppSlideButton from "../molecules/AppSlideButton.svelte";
  import AppSlideBody from "../molecules/AppSlideBody.svelte";
  import AppSlideImg from "../molecules/AppSlideImg.svelte";

  //variables
  export let works = [];

  //style
  const slideBox = css`
    ${mq[1]} {
      width: 48%;
    }
  `;
</script>

<div class={slideBox}>
  {#each works as work (work.id)}
    <AppSlideBody {...work} />
  {/each}

  <AppSlideButton />
</div>

<AppSlideImg {works} />
