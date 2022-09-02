import type {RequestEvent} from '@sveltejs/kit';
import {saveUser} from '$api/users';

/** @type {import('./$types').RequestHandler} */
export async function POST({request}: RequestEvent) {
  const body = await request.json()
  const user = await saveUser(body)

  return new Response(JSON.stringify(user))
}
