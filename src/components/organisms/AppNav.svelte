<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq } from "../../../static/style/Base.js";

  //compornents
  import AppNavItem from "../../components/molecules/AppNavItem.svelte";

  //variables
  export let segment;

  //drower
  let open = false;

  console.log(open);

  //style
  const sp = css`
    ${mq[1]} {
      display: none;
    }
  `;

  const pc = css`
    display: none;

    ${mq[1]} {
      display: block;
    }
  `;

  const nav = css`
    text-transform: uppercase;
  `;

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

  const list = css`
    list-style-type: none;
  `;

  const drawer = css`
    cursor: pointer;
    display: inline-block;
    height: 48px;
    width: 48px;
    position: relative;
  `;

  const drawerBorder = css`
    ${drawerBase()}

    &::before,
    &::after {
      content: "";
      ${drawerBase("100%", "100%")}
    }

    &::before {
      margin-top: -32%;
    }

    &::after {
      margin-top: 32%;
    }
  `;
</script>

<nav class={nav}>
  <div class={sp}>
    <button class={drawer} for="header-switch" on:click={() => (open = !open)}>
      <span class={drawerBorder} />
    </button>

    {#if open}
      <ul class={list}>
        <AppNavItem {segment} type="home" value="" />
        <AppNavItem {segment} type="about" value="" />
        <AppNavItem {segment} type="work" value="" />
        <AppNavItem {segment} type="blog" value="" />
        <AppNavItem {segment} type="contact" value="" />
      </ul>
    {/if}
  </div>

  <div class={pc}>
    <ul class={list}>
      <AppNavItem {segment} type="home" value="" />
      <AppNavItem {segment} type="about" value="" />
      <AppNavItem {segment} type="work" value="" />
      <AppNavItem {segment} type="blog" value="" />
      <AppNavItem {segment} type="contact" value="" />
    </ul>
  </div>
</nav>
