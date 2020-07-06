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

  const slideImageItem = css`
    width: 100%;
    height: 240px;

    ${mq[1]} {
      min-width: 800px;
      height: 400px;
      list-style-type: none;
      overflow: hidden;
      margin-right: 2em;
    }

    img {
      object-fit: cover;
    }
  `;
</script>

<li class={slideImageItem}>
  <picture>
    <source media="(min-width: 768px)" srcset="{img}_l.jpg" />
    <img src="{img}_s.jpg" alt={despriction} />
  </picture>
</li>
