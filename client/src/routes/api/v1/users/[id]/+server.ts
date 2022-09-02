import type {RequestEvent} from '@sveltejs/kit';
import {deleteUser} from '$api/users';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({params}: RequestEvent) {
  const id = params.id!
  const res = await deleteUser(id)

  return new Response(JSON.stringify(res))
}
