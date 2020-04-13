<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";

  //compornents

  //variables
  export let type = "button";
  export let areaLabel = "";
  export let className = "primary";

  //style
</script>

<button class={className} {type} aria-label={areaLabel} />
