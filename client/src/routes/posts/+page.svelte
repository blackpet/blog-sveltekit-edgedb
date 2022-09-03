<script lang="ts">
  import {formatYmdhm} from "$lib/utils/dayjs-util.js";
  import type {Post} from '$types/post';

  interface DataProps {
    posts: Post[]
  }
  export let data: DataProps
  console.log('+page posts', data.posts)
</script>

<header>
  <h1>Posts</h1>
  <div>
    <a href="/posts/form" class="btn">Create New Post</a>
  </div>
</header>

<main>
{#if !data.posts?.length}
  <div class="flex justify-center py-12">
    <div class="border border-slate-300 rounded-xl w-52 h-52 grid place-items-center text-slate-500">No Post!</div>
  </div>
{/if}
</main>
