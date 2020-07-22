333w2<script context="module">
  //common
  import { css, keyframes } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../../static/style/Base.js";
  import { center, secP, sp96, leftP } from "../../../static/style/Variables.js";
  import { display1, display2 } from "../../../static/style/Title.js";

  //compornents
  // import AppTitle from "../components/atoms/itle.svelte";
  import AppTwoColumnWide from "../../components/organisms/AppTwoColumnWide.svelte";
  import AppSlide from "../../components/organisms/AppSlide.svelte";
  import AppForm from "../../components/organisms/AppForm.svelte";
	import AppCvButton from "../../components/atoms/AppCvButton.svelte";

	//function
	import { getArticles } from '../../api/cms.js'

	export function preload({ params, query }) {
			return getArticles()
							.then(posts => {
											return { posts };
							});
	}

</script>

<script>
	export let posts;

	//animation

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
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>blog | murakami naomi's portfolio site</title>
</svelte:head>

<h1>blog</h1>
<ul>
	{#each posts as post}
		<li><a rel='prefetch' href='{post.fields.slug}'>{post.fields.title}</a></li>
	{/each}
</ul>
