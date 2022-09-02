import type {ServerLoadEvent} from '@sveltejs/kit'
import {allUsers} from '../../api/users';

/** @type {import('./$types').PageServerLoad} */
export async function load(event: ServerLoadEvent) {
  const users = await allUsers()
  return {users}
}
