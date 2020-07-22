<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96 } from "../../../static/style/Variables.js";
  import { display1 } from "../../../static/style/Title.js";

  //compornents
  import AppTag from "../../components/atoms/AppTag.svelte";
  import AppTagList from "../organisms/AppTagList.svelte";

  //variables
  // export let point;
  export let img = "";
  export let title = "";
  export let despriction = "";
  export let body = "";

  let tags = [
    { id: 1,label: "Photoshop"},
    { id: 2,label: "XD"},
    { id: 3,label: "Figma"},
    { id: 4,label: "Illustrator"},
    { id: 5,label: "HTML/CSS"},
    { id: 6,label: "Pug"},
    { id: 7,label: "Sass"},
    { id: 8,label: "Git"},
    { id: 9,label: "Gulp"},
    { id: 10,label: "jQuery"},
    { id: 11,label: "WordPress"},
    { id: 12,label: "React"},
    { id: 13,label: "Vue(Nuxt)"},
    { id: 14,label: "Svlete"},
    { id: 15,label: "SpriteStudio"}
  ];

  //style

  const pointBlock = css`
    margin-bottom: 40px;
		max-width: 980px;

    ${mq[1]} {
    }

    ${mq[2]} {
    }
    `;

  const pointItem = css`
    ${mq[1]} {
      display: flex;
      justify-content: flex-end;
      align-items: start;
      position: relative;
    }
  `;

  const pointBody = css`
    text-align: left;
    padding: 16px 24px;

    ${mq[1]} {
      padding: 48px 56px;
      width: 56%;
      position: relative;
      z-index: 2;
    }
  `;

  const pointText = css`
    > p {
      margin-bottom: 1rem;
    }
  `;

  const pointImage = css`

    ${mq[1]} {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: calc(64% - 16px);
      z-index: 1;
      background: ${Color.White};

      img{
        width: 100%;
        height: auto;
      }
    }
  `;
</script>

<style>
</style>

<div class={pointBlock}>
  <div class={pointItem}>
    <section class={pointBody}>
      <h3 class={display1}>{title}</h3>
      <div class={pointText}>{@html body}</div>
      <AppTagList {tags} />
    </section>
    <div class={pointImage}>
      <img src={img} alt={despriction} />
    </div>
  </div>
</div>
