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

	//function
	export function preload({ params, query }) {
		return this.fetch(`work.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}

</script>

<script>

	export let posts;

	//animation


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

	const workContainer = css `
		list-style: none;
		display: grid;
		grid-gap: 8px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;

		${mq[1]} {
			${rem(14)};
			grid-gap: 16px;
			grid-auto-rows: 240px;
    	grid-template-columns: repeat(auto-fill, 240px);
		}

		${mq[2]} {
			max-width: ${breakpoints[2]}px;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: auto;
		}
	`;

	const item = css`
		font-size: ${rem[14]};
		background: ${Color.White};
	`
	export const largeT = css`
		grid-column: 1/3;
		grid-row: auto;
	`;

	const large1 = css `
		${largeT};
		${mq[1]} {
			grid-column: 1 / 3;
			grid-row: 1 / 3;
		}
	`;
	const large2 = css `
		${largeT};
		${mq[1]} {
			grid-column: 3 / 5;
		}
	`;
	const large3 = css `
		${largeT};
		${mq[1]} {
			grid-column: 4 / 5;
			grid-row: 3 / 5;
		}
	`;

	const large4 = css `
		${largeT};
		${mq[1]} {
			grid-column: 2 / 4;
		}
	`;

	//////////////////
	const itemText = css`
    order: 3;
  `;

  const itemImg = css`
    width: 100%;
    order: 1;
    heigth: auto;

    img{
      width: 100%;
      heigth: auto;
    }
  `;

  const itemBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1em 1em 0.5em;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    transition: all 0.1s ease-in-out;
    text-decoration: none;

    ${mq[1]} {
    	padding: 1.875em 1.875em 0.875em;

      &:hover{
        opacity: 0.7;
      }
    }
  `;

  const itemTitle = css`
		order: 2;
		${rem(13)};

		${mq[1]} {
			${rem(16)};
    }
  `;

</script>

<style>
</style>

<svelte:head>
	<title>Work | murakami naomi's portfolio site</title>
</svelte:head>

<div class={work}>
	<div class={workBlock}>
			<h1 class={display2}>work</h1>

			<div class={workBox}>
				<ul class={workContainer}>
					{#each posts as post}
						<!-- we're using the non-standard `rel=prefetch` attribute to
								tell Sapper to load the data for the page as soon as
								the user hovers over the link or taps it, instead of
								waiting for the 'click' event -->
						<li class={item}>
							<a class={itemBox} href='work/{post.slug}' rel='prefetch'>
								<h3 class={mainHeading,itemTitle} >{post.title}</h3>
								<figure class={itemImg}>
									<img src={post.thum} alt={post.title}>
								</figure>
								<div class={itemText}>{post.despriction}</div>
							</a>

						</li>
						{:else}
						<li>loading...</li>
					{/each}
				</ul>
			</div>

	</div>
</div>
