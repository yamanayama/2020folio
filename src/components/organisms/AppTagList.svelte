<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96 } from "../../../static/style/Variables.js";

  //compornents
  import AppTag from "../../components/atoms/AppTag.svelte";

  //variables
  export let tags = [];

  //style
	//tag
  const tagBlock = css`
    margin-top: 16px;

    ${mq[1]}{
      margin-top: 32px;
    }
  `;

  const tagList = css`
    display: flex;
    flex-wrap: wrap;
  `;

</script>

<style>
</style>

<div class={tagBlock}>
  <ul class={tagList}>
    {#each tags as tag (tag.id)}
      <AppTag {...tag} />
    {/each}
  </ul>
</div>
