<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96 } from "../../../static/style/Variables.js";
  import { display1 } from "../../../static/style/Title.js";

  //compornents

  //variables
  export let img = "";
  export let despriction = "";

  //style
  function drawerBase(height = "1px", width = "56%") {
    return {
      height: height,
      background: `${Color.Text100}`,
      transition: "all 0.25s ease-out",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      width: width
    };
  }

  const worksImgItem = css`
    ${mq[1]} {
      width: 48%;
    }
  `;
</script>

<li class={worksImgItem}>
  <picture>
    <source media="(min-width: 768px)" srcset="{img}_l.jpg" />
    <img src="{img}_s.jpg" alt={despriction} />
  </picture>
</li>
