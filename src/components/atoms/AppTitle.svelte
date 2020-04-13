<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq } from "../../../static/style/Base.js";

  //compornents

  //variables
  export let heading = "h2";
  export let className = "mainHeading";

  // export default {
  //   name: 'heading',
  //   props: {
  //     heading: {
  //       type: String,
  //       requires: false,
  //       default: '2',
  //     },
  //   }
  // }

  // hX の共通 style
  function HcommonStyle() {
    return {
      color: Color.Text100,
      padding: "8px"
    };
  }

  // h1 の style
  export const H1 = css`
    ${HcommonStyle},
    fontSize: "24px",
  `;

  // h2 の style
  export const display1 = css`
    ${HcommonStyle},
    ${rem(17)}

    ${mq[1]}{
      ${rem(34)}
    }
  `;

  export const display2 = css`
    ${HcommonStyle},
    ${rem(24)}

    ${mq[1]}{
      ${rem(48)}
    }
  `;

  export const mainHeading = css`
    ${HcommonStyle},
    ${rem(18)}

    ${mq[1]}{
      ${rem(24)}
    }
  `;

  export const subHeading = css`
    ${HcommonStyle},
    ${rem(16)}

    ${mq[1]}{
      ${rem(18)}
    }
  `;

  export const hTitle = css`
    ${HcommonStyle},
    ${rem(18)}

    ${mq[1]}{
      ${rem(22)}
    }
  `;

  export const BodyBold = css`
    ${HcommonStyle},
    ${rem(13)}
    font-weight: bold;

    ${mq[1]} {
      ${rem(14)}
    }
  `;

  export const Body = css`
    ${HcommonStyle},
    ${rem(13)}

    ${mq[1]}{
      ${rem(14)}
    }
  `;
</script>

<!--
{#if heading === 'h1'}
  <h1 class={className}>
    <slot />
  </h1>
{/if}

{#if heading === 'h2'}
  <h2 class={className}>
    <slot />
  </h2>
{/if}

{#if heading === 'h3'}
  <h3 class={className}>
    <slot />
  </h3>
{/if}

{#if heading === 'h4'}
  <h4 class={className}>
    <slot />
  </h4>
{/if}

{#if heading === 'h5'}
  <h5 class={className}>
    <slot />
  </h5>
{/if} -->
