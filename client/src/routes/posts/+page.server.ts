import type {ServerLoadEvent} from '@sveltejs/kit'
import {allPosts} from '$api/posts';

/** @type {import('./$types').PageServerLoad} */
export async function load(event: ServerLoadEvent) {
  const posts = await allPosts()
  return {posts}
}
