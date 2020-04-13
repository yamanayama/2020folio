<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96 } from "../../../static/style/Variables.js";
  import { display1, mainHeading } from "../../../static/style/Title.js";

  //compornents
  import AppSlideButton from "../molecules/AppSlideButton.svelte";
  import AppSlideImgItem from "../atoms/AppSlideImgItem.svelte";
  import AppSlideBody from "../molecules/AppSlideBody.svelte";

  //variables
  export let works = [];
  export let img = "";
  export let title = "";
  export let despriction = "";
  export let body = "";

  console.log(works);

  //style
  const slideBlock = css`
    ${mq[1]} {
      width: 48%;
    }
  `;

  const item = css`
    ${mq[1]} {
    }
  `;

  const text = css`
    ${mq[1]} {
    }
  `;

  const slideImage = css`
    ${mq[1]} {
    }
  `;

  const imgList = css`
    ${mq[1]} {
    }
  `;
</script>

<div class={slideBlock}>
  {#each works as work (work.id)}
    <AppSlideBody {...work} />
  {/each}

  <AppSlideButton />
</div>

<div class={slideImage}>
  <ul class={imgList}>
    {#each works as work (work.id)}
      <AppSlideImgItem {...work} />
    {/each}
  </ul>
</div>
