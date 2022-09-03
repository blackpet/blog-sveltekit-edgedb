import type {Post} from '$types/post';
import {get} from 'svelte/store';
import {userStore} from '../lib/stores/user-store';

//------------- server API -------------
async function allPosts() {
  const res = await fetch('http://localhost:5201/posts')
  const posts: Post[] = await res.json()

  return posts
}

async function findPost(id: string) {
  const res = await fetch(`http://localhost:5201/posts/${id}`)
  const user: Post = await res.json()

  return user
}

async function savePost(request: Post) {
  const res = await fetch('http://localhost:5201/posts', {
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
  const res = await fetch(`http://localhost:5201/posts/${id}`, {
    method: 'DELETE',
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
  const post = await res.json()
  return post
}
async function deletePost_v1(id: string) {
  const res = await fetch(`/api/v1/posts/${id}`, {
    method: 'DELETE',
  })
  const post = await res.json()
  return post
}
//------------- // client API (sveltekit server) -------------

export {
  // server fns...
  allPosts,
  findPost,
  savePost,
  deletePost,


  // client fns...
  savePost_v1,
  deletePost_v1,
}
