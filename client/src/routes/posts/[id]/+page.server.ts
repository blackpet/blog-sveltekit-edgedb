import type {ServerLoadEvent} from '@sveltejs/kit'
import {findPost} from '$api/posts';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}: ServerLoadEvent) {
  const post = await findPost(params.id!)
  return {post}
}
