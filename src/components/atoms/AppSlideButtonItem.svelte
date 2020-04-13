<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";

  //compornents

  //variables
  export let type = "button";
  // export let label = "";
  export let areaLabel = "";
  export let className = "worksButtonPrev";

  //style
  function worksButton() {
    return {};
  }
  const worksButtonPrev = css`
    list-style-type: none;
  `;
  const worksButtonNext = css`
    list-style-type: none;
  `;
</script>

<button class={className} {type} aria-label={areaLabel} />
