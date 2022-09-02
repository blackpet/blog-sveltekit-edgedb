import type {ServerLoadEvent} from '@sveltejs/kit'
import {allUsers, findUser} from '../../../api/users';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}: ServerLoadEvent) {
  const user = await findUser(params.id!)
  return {user}
}
