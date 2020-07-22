<script context="module">
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96, leftP } from "../../../static/style/Variables.js";
  import { display1, display2,mainHeading } from "../../../static/style/Title.js";

  //compornents
  import AppTwoColumnWide from "../../components/organisms/AppTwoColumnWide.svelte";
	import AppSlide from "../../components/organisms/AppSlide.svelte";

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`work/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;


	const work = css `
		background: ${Color.Gray200};
    ${rem(13)};
	`;

	const workBlock = css `
		${leftP};
		${sp96};
    padding: 4rem 0;

		${mq[1]} {
			padding-top: 80px;
      max-width: calc(${breakpoints[1]}px - 240px) ;
		}

		${mq[1]} {
      max-width: ${breakpoints[2]}px;
		}
	`;

	const workBox = css `

		${mq[1]} {
		}
	`;

</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{post.title} | murakami naomi's portfolio site</title>
</svelte:head>
<div class={work}>
	<div class={workBlock}>
		<h1>{post.title}</h1>

		<div class='content'>
			{@html post.html}
		</div>
	</div>
</div>
