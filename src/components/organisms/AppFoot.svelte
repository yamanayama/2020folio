<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";

  //compornents
  import AppFootText from "../../components/atoms/AppFootText.svelte";

  //style
  const footer = css`
    padding: 4rem;
    background: ${Color.Gray500};
  `;
</script>

<style>

</style>

<footer class={footer}>
  <AppFootText />
</footer>
