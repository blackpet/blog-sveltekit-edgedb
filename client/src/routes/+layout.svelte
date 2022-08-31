<script lang="ts">
  import '../app.css'
  import Header from "../lib/components/Header.svelte";
</script>

<Header />

<main>
  <slot></slot>
</main>

<style>
  main {@apply p-4;}
</style>
