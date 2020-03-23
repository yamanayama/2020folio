<script>
  //common
  import { css } from "emotion";
  import { mq } from "../../../static/style/Base.js";

  //compornents
  import AppHeadBox from "../../components/molecules/AppHeadBox.svelte";

  //variables
  const header = css`
    ${mq[1]}{
      max-width: 260px;
    }
  `

  //style

</script>

<div class={header}>
  <AppHeadBox />
</div>
