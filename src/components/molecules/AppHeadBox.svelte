<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { rem,mq } from "../../../static/style/Base.js";

  //compornents
  import AppNav from "../../components/organisms/AppNav.svelte";
  import AppHeadLogo from "../../components/atoms/AppHeadLogo.svelte";

  //variables
  export let segment;

  //style
  const header = css`
    display: flex;
    padding: 8px 16px;

    ${mq[1]}{
      flex-direction: column-reverse;
      padding: 32px 16px 48px 40px;
    }
  `;
</script>

<header class={header}>
  <AppNav {segment} />
  <AppHeadLogo />
</header>
