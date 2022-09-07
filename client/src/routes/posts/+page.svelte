<script lang="ts">
  import {formatYmdhm} from "$lib/utils/dayjs-util.js";
  import type {Post} from '$types/post';

  interface DataProps {
    posts: Post[]
  }
  export let data: DataProps
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

{:else}
  <table class="table-auto w-full">
    <thead>
    <tr>
      <th>id</th>
      <th>title</th>
      <th>like</th>
      <th>created at</th>
      <th>last modified at</th>
    </tr>
    </thead>

    <tbody>
    {#each data.posts as post (post.id)}
      <tr>
        <td><a href="/posts/{post.id}">{post.id}</a></td>
        <td>{post.title}</td>
        <td class="property flex gap-4">
          <div>👍 {post.like_count}</div>
          <div>👎 {post.dislike_count}</div>
        </td>
        <td>{formatYmdhm(post.created_at)}</td>
        <td>{formatYmdhm(post.last_modified_at)}</td>
      </tr>
    {/each}
    </tbody>
  </table>

{/if}
</main>
