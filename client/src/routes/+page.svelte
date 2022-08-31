<script lang="ts">
  export let data
</script>
<div class="debug">
  <div class="whitespace-pre">users: {JSON.stringify(data, null, 2)}</div>
</div>

<h1 class="text-2xl">Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style>
  .debug {
    @apply bg-gray-100 mb-8 p-4;
  }
</style>
