//common
import { css } from "emotion";
import Color from "../style/Color.js";
import { mq, rem } from "../style/Base.js";

// hX の共通 style
export function HcommonStyle() {
  return {
    color: Color.Text100,
  };
}

// h1 の style
export const H1 = css`
  ${HcommonStyle()}
  fontSize: "24px",
`;

// h2 の style
export const display1 = css`
    ${HcommonStyle()}
    ${rem(17)}
    text-transform: capitalize;
    margin-bottom: 1rem;

  ${mq[1]}{
    ${rem(34)}
  }
`;

export const display2 = css`
    ${HcommonStyle()}
    ${rem(24)}
    -webkit-text-stroke: .03em ${Color.Text100};
    color: transparent;
    text-transform: uppercase;
    letter-spacing: .03em;
    margin-bottom: 1rem;

  ${mq[1]}{
    ${rem(48)}
  }
`;

export const mainHeading = css`
    ${HcommonStyle()}
    ${rem(18)}

  ${mq[1]}{
    ${rem(24)}
  }
`;

export const subHeading = css`
    ${HcommonStyle()}
    ${rem(16)}

  ${mq[1]}{
    ${rem(18)}
  }
`;

export const hTitle = css`
    ${HcommonStyle()}
    ${rem(18)}

  ${mq[1]}{
    ${rem(22)}
  }
`;

export const BodyBold = css`
    ${HcommonStyle()}
    ${rem(13)}
  font-weight: bold;

    ${mq[1]} {
    ${rem(14)}
  }
`;

export const Body = css`
    ${HcommonStyle()}
    ${rem(13)}

  ${mq[1]}{
    ${rem(14)}
  }
`;
