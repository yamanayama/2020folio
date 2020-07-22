<script>
  //common
  import { css } from "emotion";
  import Color from "../../../static/style/Color.js";

  //variables
  export let segment;
  export let type = "none";

  let attr = {
    none: {
      caption: "",
      segment: "undefined"
    },
    home: {
      caption: "home",
      link: "/",
      segment: "undefined"
    },
    about: {
      caption: "about",
      link: "about",
      segment: "about"
    },
    work: {
      caption: "work",
      link: "work",
      segment: "work"
    },
    blog: {
      caption: "blog",
      link: "blog",
      segment: "blog"
    },
    contact: {
      caption: "contact",
      link: "contact",
      segment: "contact"
    }
  };

  //style
  const current = css`
    content: ;
    text-transform: uppercase;
    font-family: ${Color.FontFamilyEng100};
    [aria-current] {
      background: ${Color.White};
      font-weight: 600;
    }
  `;

  const link = css`
    text-decoration: none;
    font-weight: bold;

    &:hover {
      background: rgba(255, 255, 255, 0.8);
    }
  `;
</script>

<li class={current}>
  <a
    class={link}
    aria-current={segment === attr[type].segment ? attr[type].caption : undefined}
    href={attr[type].link}>
    {attr[type].caption}
  </a>
</li>
