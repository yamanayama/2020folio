<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";

  //compornents
  import AppNav from "../../components/organisms/AppNav.svelte";
  import AppHeadLogo from "../../components/atoms/AppHeadLogo.svelte";

  //variables
  export let segment;

  //style
  const nav = css`
    text-transform: uppercase;
  `;
</script>

<header>
  <AppHeadLogo />
  <AppNav {segment} />
</header>
