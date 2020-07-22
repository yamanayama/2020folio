<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { mainHeading } from "../../../static/style/Title.js";

  //compornents

  //variables
  export let body = "";
  export let title = "";
  export let img = "";
  export let link = "";

  //style
  const itemBlock = css``;

  const itemText = css`
    order: 3;
  `;

  const itemImg = css`
    width: 100%;
    order: 1;
    heigth: auto;

    img{
      width: 100%;
      heigth: auto;
    }
  `;

  const itemBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1.875em 1.875em 0.875em;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    transition: all 0.4s ease-in-out;
    text-decoration: none;

    ${mq[1]} {
      &:hover{
        transform: translateY(-15px);
      }
    }
  `;

  const itemTitle = css`
    order: 2;
  `;

</script>

<section class={itemBlock}>
  <a class={itemBox} href={link}>
    <h3 class={mainHeading,itemTitle} >{title}</h3>
    <figure class={itemImg}>
      <img src={img} alt={title}>
    </figure>
    <div class={itemText}>{body}</div>
  </a>
</section>
