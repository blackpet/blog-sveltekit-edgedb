import { FastifyPluginAsync } from 'fastify'
import {User} from '$types/user';
import {client} from '../../lib/edgedb-client';

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const users: User[] = await client.query(`
    select User {
      id,
      login_id,
      email,
      name,
    }`)

    request.log.trace('/users', users)
    return users
  })
}

export default users;
