<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq } from "../../../static/style/Base.js";

  //compornents
  import AppSlideImgItem from "../atoms/AppSlideImgItem.svelte";

  //variables
  export let works = [];

  //style
  const slideImage = css`
    width: 100%;
    display: flex;

    ${mq[1]} {
    }
  `;
</script>

<ul class={slideImage}>
  {#each works as work (work.id)}
    <AppSlideImgItem {...work} />
  {/each}
</ul>
