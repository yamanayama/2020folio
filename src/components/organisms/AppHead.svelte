<script>
  //common
  import { css } from "emotion";
  import { mq } from "../../../static/style/Base.js";

  //compornents
  import AppHeadBox from "../../components/molecules/AppHeadBox.svelte";
  import AppHeadLogo from "../../components/atoms/AppHeadLogo.svelte";

  //variables

  //style
  const header = css`
    position: fixed;
    z-index: 100;

    ${mq[1]} {
      max-width: 260px;
    }
  `;
</script>

<div class={header}>
  <AppHeadBox />
</div>
