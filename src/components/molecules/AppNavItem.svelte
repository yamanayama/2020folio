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
      link: "m69kn",
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
    text-transform: uppercase;
    font-family: ${Color.FontFamilyEng100};
    [aria-current] {
      background: ${Color.White};
      font-weight: 600;
    }
  `;

  const link = css`
    text-decoration: none;
  `;
</script>

<!-- {#if attr[type].segment === 'blog' ? 'rel="prefetch"' } -->

<li class={current}>
  {#if attr[type].segment === 'blog'}
    <a
      class={link}
      rel="prefetch"
      aria-current={segment === attr[type].segment ? attr[type].caption : undefined}
      href={attr[type].link}>
      {attr[type].caption}
    </a>
  {:else}
    <a
      class={link}
      aria-current={segment === attr[type].segment ? attr[type].caption : undefined}
      href={attr[type].link}>
      {attr[type].caption}
    </a>
  {/if}
</li>
