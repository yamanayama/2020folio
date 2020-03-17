<script>
  import AppNav from "../../components/organisms/AppNav.svelte";
  import AppHeadLogo from "../../components/atoms/AppHeadLogo.svelte";

  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";

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
