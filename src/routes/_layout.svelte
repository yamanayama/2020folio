<script>
  //common
  import { css } from "emotion";
  import { rem, breakpoints, mq, square } from "../../static/style/Base.js";
  import Color from "../../static/style/Color.js";
  import {
    centerF,
    justify,
    radius,
    center,
    gridLayout,
    counter,
    secP,
    maxW,
    sp96,
    card,
    truncate,
    lineTruncate,
    multipleLine,
    linkColor,
    fullWidth,
    shadow,
    clearfix
  } from "../../static/style/Variables.js";

  //compornents
  import Nav from "../components/organisms/AppNav.svelte";
  import Header from "../components/organisms/AppHead.svelte";
  import Footer from "../components/organisms/AppFoot.svelte";

  //variables
  export let segment;
</script>

<style>
  main {
  }
</style>

<Header {segment} />

<main>
  <slot />
</main>

<Footer />
