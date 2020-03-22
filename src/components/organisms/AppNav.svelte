<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";

  //compornents
  import AppNavItem from "../../components/molecules/AppNavItem.svelte";

  //variables
  export let segment;

  //style
  const nav = css`
    text-transform: uppercase;
  `;

  const list = css`
    list-style-type: none;
  `;
</script>

<nav class={nav}>
  <ul class={list}>
    <AppNavItem {segment} type="home" value="" />
    <AppNavItem {segment} type="about" value="" />
    <AppNavItem {segment} type="work" value="" />
    <AppNavItem {segment} type="blog" value="" />
    <AppNavItem {segment} type="contact" value="" />
  </ul>
</nav>
