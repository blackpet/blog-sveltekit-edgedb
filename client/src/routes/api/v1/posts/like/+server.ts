import type {RequestEvent} from '@sveltejs/kit';
import {deletePostLike, likePost} from '$api/posts';

/** @type {import('./$types').RequestHandler} */
export async function POST({request, params}: RequestEvent) {
  const {id, type} = await request.json()
  const res = await likePost(id, type)

  return new Response(JSON.stringify(res))
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({request}: RequestEvent) {
  const {id} = await request.json()
  const res = await deletePostLike(id)

  return new Response(JSON.stringify(res))
}
