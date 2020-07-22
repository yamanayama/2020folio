<script>
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../static/style/Base.js";
  import { center, secP, sp96, leftP } from "../../static/style/Variables.js";
	import { display1, display2 } from "../../static/style/Title.js";

	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';

	const aboutBlock = css `
	${leftP};
	${sp96};
	padding: 4rem 0;

	${mq[1]} {
		padding-top: 80px;
		max-width: ${breakpoints[2]}px;
	}
`;
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	p {
		margin: 1em auto;
		font-size: 14px;
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1 class={display1}>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
