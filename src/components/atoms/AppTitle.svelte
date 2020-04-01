<script>
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";
  import { mq } from "../../static/style/Base.js";



export default {
  name: 'heading',
  props: {
    heading: {
      type: String,
      requires: false,
      default: '2',
    },
  }
}


  // hX の共通 style
  function HcommonStyle() {
    return {
      color: Color.Text100,
      padding: "8px",
    };
  }

  // h1 の style
  export const H1 = css`
    ${HcommonStyle},
      fontSize: "24px",
  `;

  // h2 の style
  export const = css`
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

  export const heading = css`
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

    ${mq[1]}{
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

//:isはvue
<h :is={heading}　class={}>
  <slot></slot>
</h :is={heading}>
