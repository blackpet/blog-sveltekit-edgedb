import type {RequestEvent} from '@sveltejs/kit';
import {deletePost} from '$api/posts';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({params}: RequestEvent) {
  const id = params.id!
  const res = await deletePost(id)

  return new Response(JSON.stringify(res))
}
