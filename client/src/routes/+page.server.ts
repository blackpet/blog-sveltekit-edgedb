import type {ServerLoadEvent} from '@sveltejs/kit'
import {client} from '../lib/edgedb/client';

/** @type {import('./$types').PageServerLoad} */
export async function load(event: ServerLoadEvent) {
  const users = await client.query(`
    select User {
      id,
      login_id,
      email,
      name,
    };
  `)
  return users
}
