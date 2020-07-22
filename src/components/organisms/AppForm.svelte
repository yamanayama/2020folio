<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96 } from "../../../static/style/Variables.js";
  import { display1 } from "../../../static/style/Title.js";

  //compornents
  import AppInput from "../../components/atoms/AppInput.svelte";

  //variables

  //style
  const formBlock = css`
      margin-bottom: 24px;

		${mq[1]} {
			max-width: ${breakpoints[1]}px;
			margin-bottom: 40px;
		}
  `;
</script>

<form name="contact" method="POST" netlify class={formBlock}>
  <!-- Your Form -->
  <AppInput />
</form>
