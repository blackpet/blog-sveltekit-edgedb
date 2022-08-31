import type {ServerLoadEvent} from '@sveltejs/kit'
import {client} from '$lib/edgedb/client';
import type {User} from '$types/user';

/** @type {import('./$types').PageServerLoad} */
export async function load(event: ServerLoadEvent) {
  const users: User[] = await client.query(`
  select User {
    id,
    login_id,
    email,
    name,
  }`)

  console.log('/user/server', users)
  return {users}
}
