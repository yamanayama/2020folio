<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";

  //compornents
  import AppSlideButtonItem from "../../components/atoms/AppSlideButtonItem.svelte";

  //variables

  //style
  const worksButton = css`
    display: flex;
  `;
</script>

<div class={worksButton}>
  <AppSlideButtonItem
    className="worksButtonPrev"
    type="button"
    areaLabel="Previous" />
  <AppSlideButtonItem
    className="worksButtonNext"
    type="button"
    areaLabel="Next" />
</div>
