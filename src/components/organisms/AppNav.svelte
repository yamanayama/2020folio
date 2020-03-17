<script>
  import AppNavItem from "../../components/molecules/AppNavItem.svelte";

  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";

  export let segment;

  const nav = css`
    text-transform: uppercase;
  `;
</script>

<style>

</style>

<nav class={nav}>
  <ul>
    <AppNavItem {segment} type="home" value="" />
    <AppNavItem {segment} type="about" value="" />
    <AppNavItem {segment} type="work" value="" />
    <AppNavItem {segment} type="blog" value="" />
    <AppNavItem {segment} type="contact" value="" />
  </ul>
</nav>
