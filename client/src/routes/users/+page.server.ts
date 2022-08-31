import type {ServerLoadEvent} from '@sveltejs/kit'
import type {User} from '$types/user';

/** @type {import('./$types').PageServerLoad} */
export async function load(event: ServerLoadEvent) {
  const res = await fetch('http://localhost:5201/users')
  const users: User[] = await res.json()

  console.log('/user/server', users)
  return {users}
}
