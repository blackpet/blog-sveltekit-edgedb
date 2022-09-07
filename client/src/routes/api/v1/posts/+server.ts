import type {RequestEvent} from '@sveltejs/kit';
import {savePost} from '$api/posts';

/** @type {import('./$types').RequestHandler} */
export async function POST({request}: RequestEvent) {
  const body = await request.json()
  const postId = await savePost(body)

  return new Response(JSON.stringify(postId))
}
