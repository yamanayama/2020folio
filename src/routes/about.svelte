
<script>
	  //common
  import { css, keyframes } from "emotion";
  import Color from "../../static/style/Color.js";
  import { mq, rem, breakpoints } from "../../static/style/Base.js";
  import { center, secP, sp96, leftP } from "../../static/style/Variables.js";
  import { display1, display2,mainHeading } from "../../static/style/Title.js";

  //compornents
  // import AppTitle from "../components/atoms/itle.svelte";
  import AppTwoColumnProf from "../components/organisms/AppTwoColumnProf.svelte";
  import AppSlide from "../components/organisms/AppSlide.svelte";
	import AppCvButton from "../components/atoms/AppCvButton.svelte";

  //variables
  let points = [
    {
      id: 1,
      img: "../images/about/prof_img01.jpg",
      title: "村上 奈緒美",
      despriction: "村上 奈緒美 WEB/UIデザイナー",
      body:
				`<p>一般職、ゲームイラストレーターを経てWEB業界へきました。<br>
				受託制作会社でWEBデザイナー・コーダー・ディレクター兼任後、インハウスのUIデザイナーとして働いています。</p><p>普段はGAなどのデータ分析をもとに、WEBサービスのUI開発でLPOやABテストを行うことで、PDCAを回しています。</p><p>マークアップ（CSS,アニメーション）が得意で、趣味はフロンエンドの個人開発です。Vue(Nuxt),Reactチョットデキル。</p>`
    }
	];
	let careerTitle = "2020年";
	let careers  = [
    {
			id: 1,
			title: careerTitle,
      time: "2020/01/19",
      body: "ヤフー名古屋 TechMeetup デザインを語ろう"
		},
		{
			id: 2,
			title: careerTitle,
      time: "2020/02/15",
      body: "バナーワークショップ 現役デザイナーに学ぶ　魅力的なバナーの作り方"
		},
		{
			id: 3,
			title: careerTitle,
      time: "2020/06/01",
      body: "なごやデザイナーLT大会"
		}
	];

	const about = css `
		background: ${Color.Gray200};
    ${rem(13)};
	`;

	const aboutBlock = css `
		${leftP};
		${sp96};
    padding: 4rem 0;

		${mq[1]} {
			padding-top: 80px;
      max-width: ${breakpoints[2]}px;
		}
	`;

	const aboutHero = css `
		margin-bottom: 24px;

		${mq[1]} {
			max-width: ${breakpoints[1]}px;
			margin-bottom: 40px;
		}
	`;

	const aboutBox = css `
		background: ${Color.White};
		padding: 16px 24px;

		${mq[1]} {
			max-width: ${breakpoints[1]}px;
			padding: 48px 56px;
			${rem(14)};
		}
	`;

	const aboutBoxSub = css `
		padding: 16px 0 0;

		${mq[1]} {
			max-width: ${breakpoints[2]}px;
			padding: 48px 0 0;
			${rem(14)};
		}
	`;

	//point
  const point = css`
    position: relative;
    overflow: hidden;
  `;

  const pointBlock = css`
    padding: 4rem 0;

    ${mq[1]} {
      padding: 40px 0;
      ${rem(14)};
    }
  `;

  const pointBackground = css`
    position: absolute;
    top: 80px;
    left: 0;
    height: 100%;
		z-index: -10;
	`;

  const aboutCareer = css`
    margin-bottom: 24px;

		${mq[1]} {
			max-width: ${breakpoints[1]}px;
			margin-bottom: 40px;
		}
	`;

	const aboutCareerBlock = css`
		margin-top: 24px;
	`;

	const aboutCareerList = css`
		margin-top: 8px;

		${mq[1]}{
			display: flex;
		}

		dd {
     margin-right: 2rem;
		}
	`;

</script>

<svelte:head>
  <title>About | murakami naomi's portfolio site</title>
</svelte:head>

<div class={about}>
	<div class={aboutBlock}>
		<section class={aboutHero}>
			<h1 class={display2}>about</h1>

			<section class={aboutBox}>
				<h2 class={display1}>portfolio widh Svelte</h2>
				<p>こちらは村上奈緒美のポートフォリオです。</p>
				<p>最近の活動記録など載せています。</p>
			</section>

		</section>

		<div class={aboutBoxSub}>
			<section class={point}>
				<h2 class={display2}>profile</h2>
				{#each points as point (point.id)}
					<AppTwoColumnProf {...point}/>
				{/each}
			</section>
		</div>

		<section class={aboutCareer}>
			<h2 class={mainHeading}>登壇履歴</h2>
			<section class={aboutCareerBlock}>
				{#each careers as career (career.id)}
					<dl class={aboutCareerList}>
						<dd>{career.time}</dd>
						<dt>{career.body}</dt>
					</dl>
				{/each}
			</section>
		</section>
	</div>
</div>
