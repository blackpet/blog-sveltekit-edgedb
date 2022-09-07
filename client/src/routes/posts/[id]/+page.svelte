<script lang="ts">
  import type {Post} from '$types/post';
  import {goto} from '$app/navigation';
  import {formatYmdhm} from "$lib/utils/dayjs-util.js";
  import {deletePostLike_v1, likePost_v1} from '../../../api/posts';
  import {PostLikeType} from '$lib/enums';

  interface DataProps {
    post: Post
  }
  export let data: DataProps

  let post: Post = {...data.post}
  let myLike: PostLikeType = post.my_like?.[0]?.type

  async function edit() {
    await goto(`/posts/${post.id}/form`)
  }

  async function like() {
    // toggle off?
    if (myLike === PostLikeType.Like) {
      await deletePostLike_v1(post.my_like[0].id)
      --post.like_count
      myLike = null
      return
    }

    // update/insert
    const id = await likePost_v1(post.id, PostLikeType.Like);

    // like/dislike render
    if (myLike === PostLikeType.Dislike) {
      // decrease dislike
      --post.dislike_count
    }
    // increase like
    ++post.like_count
    myLike = PostLikeType.Like
  }

  async function dislike() {
    // toggle off?
    if (myLike === PostLikeType.Dislike) {
      await deletePostLike_v1(post.my_like[0].id)
      --post.dislike_count
      myLike = null
      return
    }

    const id = await likePost_v1(post.id, PostLikeType.Dislike)

    // like/dislike render
    if (myLike === PostLikeType.Like) {
      // decrease like
      --post.like_count
    }
    // increase dislike
    ++post.dislike_count
    myLike = PostLikeType.Dislike
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
    <div class="thumb link" class:selected={myLike === PostLikeType.Like} on:click={like}>👍 {post.like_count}</div>
    <div class="thumb link" class:selected={myLike === PostLikeType.Dislike} on:click={dislike}>👎 {post.dislike_count}</div>
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
