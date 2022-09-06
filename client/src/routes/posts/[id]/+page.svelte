<script lang="ts">
  import type {Post} from '$types/post';
  import {goto} from '$app/navigation';
  import {formatYmdhm} from "$lib/utils/dayjs-util.js";

  interface DataProps {
    post: Post
  }
  export let data: DataProps

  let post: Post = {...data.post}
  let myLike = post.my_like?.[0]?.type

  async function edit() {
    await goto(`/posts/${post.id}/form`)
  }
</script>

<div class="debug">
  {JSON.stringify(post)}
</div>

<header>
  <h1>{post.title}</h1>
  <div class="flex gap-2">
    <button class="btn" on:click={edit}>Edit</button>
    <a href="/posts" class="btn block">List</a>
  </div>
</header>

<main>
  <div class="content whitespace-pre-wrap p-4 bg-gray-100 mb-8">{post.content}</div>

  <div class="property flex gap-4">
    <div class="thumb" class:selected={myLike === 'Like'}>👍 {post.like_count}</div>
    <div class="thumb" class:selected={myLike === 'Dislike'}>👎 {post.dislike_count}</div>
  </div>

  <div class="date">
    <div>created at: {formatYmdhm(post.created_at)}</div>
    <div>last modified at: {formatYmdhm(post.last_modified_at)}</div>
  </div>
</main>

<style>
  .property .thumb.selected {@apply font-bold filter-none;}
  .property .thumb {@apply grayscale;}
</style>
