<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96 } from "../../../static/style/Variables.js";
  import { display1 } from "../../../static/style/Title.js";

  //compornents
  // import AppTitle from "../components/atoms/itle.svelte";

  //variables
  // export let point;
  export let img = "";
  export let title = "";
  export let despriction = "";
  export let body = "";

  //style

  const pointBlock = css`
    background: ${Color.White};
    &:nth-child(2n + 1) {
      .css-nq8m9a {
        //苦渋の選択
        flex-direction: row-reverse;

        &::before {
          position: absolute;
          left: 0;
        }
      }
    }
    &:nth-child(2n + 1) {
      //苦渋の選択
      .css-1hi0xkk {
        background: ${Color.Gray500};
      }
    }
  `;

  const pointItem = css`
    ${mq[1]} {
      display: flex;
      justify-content: space-between;
    }
  `;

  const pointBody = css`
    text-align: left;
    padding: 16px 24px;

    ${mq[1]} {
      padding: 48px 56px;
      width: 40%;
    }
  `;

  const pointImage = css`
    text-align: left;
    padding: 16px 24px;

    ${mq[1]} {
      max-width: 480px;
    }
  `;
</script>

<style>
  /* .pointBlock:nth-child(2n + 1) .pointItem {
    flex-direction: row-reverse;
    display: flex;
  }

  .pointItem {
  } */
</style>

<div class={pointBlock}>
  <div class={pointItem}>
    <section class={pointBody}>
      <h3 class={display1}>{title}</h3>
      {body}
    </section>
    <div class={pointImage}>
      <img src={img} alt={despriction} />
    </div>
  </div>
</div>
