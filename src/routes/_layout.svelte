<script>
  //common

  //compornents
  import Nav from "../components/organisms/AppNav.svelte";
  import Header from "../components/organisms/AppHead.svelte";
  import Footer from "../components/organisms/AppFoot.svelte";

  //variables
  export let segment;
</script>

<style>

</style>

<Header {segment} />

<main>
  <slot />
</main>

<Footer />
