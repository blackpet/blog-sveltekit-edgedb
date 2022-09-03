<script lang="ts">
  import {deletePost_v1, savePost_v1} from '$api/posts';
  import {goto} from '$app/navigation'
  import {formatYmdhm} from "../utils/dayjs-util.js";
  import type {Post} from '$types/post';
  import {userStore} from '../stores/user-store';

  export let data // for modify auth

  let form: Post = {...data}

  async function submit() {
    const auth = await savePost_v1(form)
    // TODO: toast message
    await goto('/posts')
  }

  async function deletePost() {
    await deletePost_v1(form.id)
    // TODO: toast message
    await goto('/posts')
  }
</script>

<header>
  <h1>
    {#if data}
    Edit Post
    {:else}
    Create New Post
    {/if}
  </h1>
  <div class="flex gap-2">
    {#if data}
      <button class="btn" on:click={deletePost}>Delete Post</button>
    {/if}
    <button class="btn" on:click={submit}>Save</button>
    <a href="/posts" class="btn block">List</a>
  </div>
</header>

<div class="field">
  <label>title</label>
  <input type="text" name="title" bind:value={form.title}>
</div>
<div class="field">
  <label>content</label>
  <textarea name="content" bind:value={form.content} class="w-1/3 h-52"></textarea>
</div>

{#if data}
<div class="field">
  <label>created by</label>
  {form.created_by.name}
</div>
<div class="field">
  <label>created at</label>
  {formatYmdhm(form.created_at)}
</div>
<div class="field">
  <label>last modified at</label>
  {formatYmdhm(form.last_modified_at)}
</div>
{/if}
