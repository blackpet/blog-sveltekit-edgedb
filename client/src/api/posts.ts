import type {Post} from '$types/post';
import {get} from 'svelte/store';
import {userStore} from '$lib/stores/user-store';
import type {PostLikeType} from '$lib/enums';

//------------- server API -------------
const API_URL = 'http://localhost:5201'
async function allPosts() {
  const res = await fetch(`${API_URL}/posts`)
  const posts: Post[] = await res.json()

  return posts
}

async function findPost(id: string) {
  const res = await fetch(`${API_URL}/posts/${id}`)
  const user: Post = await res.json()

  return user
}

async function savePost(request: Post) {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const user = await res.json()
  return user
}

async function deletePost(id: string) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  })
  const result = await res.json()
  return result
}

async function likePost(id: string, type: PostLikeType) {
  const res = await fetch(`${API_URL}/posts/like`, {
    method: 'POST',
    body: JSON.stringify({id, type}),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await res.json()
  return result
}

async function deletePostLike(id: string) {
  const res = await fetch(`${API_URL}/posts/like`, {
    method: 'DELETE',
    body: JSON.stringify({id}),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await res.json()
  return result
}
//------------- // server API -------------




//------------- client API (sveltekit server) -------------
async function savePost_v1(form: Post) {
  const userId = get(userStore)?.id

  const res = await fetch('/api/v1/posts', {
    method: 'POST',
    body: JSON.stringify({...form, user_id: userId})
  })
  const postId = await res.json()
  return postId
}

async function deletePost_v1(id: string) {
  const res = await fetch(`/api/v1/posts/${id}`, {
    method: 'DELETE',
  })
  const post = await res.json()
  return post
}

async function likePost_v1(id: string, type: PostLikeType) {
  const res = await fetch(`/api/v1/posts/like`, {
    method: 'POST',
    body: JSON.stringify({id, type})
  })
  const likeId = await res.json()
  return likeId
}

async function deletePostLike_v1(id: string) {
  const res = await fetch(`/api/v1/posts/like`, {
    method: 'DELETE',
    body: JSON.stringify({id})
  })
  const result = await res.json()
  return result
}
//------------- // client API (sveltekit server) -------------

export {
  // server fns...
  allPosts,
  findPost,
  savePost,
  deletePost,
  likePost,
  deletePostLike,

  // client fns...
  savePost_v1,
  deletePost_v1,
  likePost_v1,
  deletePostLike_v1,
}
