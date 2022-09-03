import {FastifyPluginAsync} from 'fastify'
import {User} from '$types/user';
import {client} from '../../lib/edgedb-client';
import {z} from 'zod';
import {ZodTypeProvider} from 'fastify-type-provider-zod';

/**
 * User API
 * @prefix [directory name] /users
 * @param fastify
 * @param opts
 */
const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.get('/', async function (request, reply) {
    const users: User[] = await client.query(`
      select User {
        id,
        email,
        name,
        created_at,
        last_modified_at,
      }
    `)

    return users
  })


  /**
   * insert / update user
   */
  const saveUserRequest = z.object({
    id: z.string().uuid().optional(),
    email: z.string(),
    name: z.string(),
  })
  type SaveUserRequest = z.infer<typeof saveUserRequest>
  const saveUserSchema = {
    body: saveUserRequest
  }
  fastify.withTypeProvider<ZodTypeProvider>().post('/', {schema: saveUserSchema}, async function (request, reply) {
    const data = request.body
    console.log('body', data)
    let id

    if (data.id) {
      id = await updateUser(data)
    } else {
      id = await createUser(data)
    }

    reply.status(201)
    return id
  })

  async function createUser(data: SaveUserRequest) {
    const id = await client.querySingle<User>(`
      insert User {
        email := <str>$email,
        name := <str>$name,
      }
    `, data);
    console.log('POST createUser /users/ id', id)
    return id
  }

  async function updateUser(data: SaveUserRequest) {
    const id = await client.querySingle<User>(`
      update User 
      filter .id = <uuid>$id
      set {
        email := <str>$email,
        name := <str>$name,
        last_modified_at := datetime_current(),
      }
    `, data);
    console.log('POST updateUser /users/ id', id)
    return id
  }

  /**
   * get user
   */
  const getUserRequest = z.object({
    id: z.string().uuid(),
  })
  const getUserSchema = {
    params: getUserRequest
  }
  fastify.withTypeProvider<ZodTypeProvider>().get('/:id', {schema: getUserSchema}, async function (request, reply) {
    const id = request.params.id

    const user: User = await client.queryRequiredSingle<User>(`
      select User {
        id,
        email,
        name,
        created_at,
        last_modified_at,
      }
      filter .id = <uuid>$id
    `, {id})

    return user
  })

  fastify.withTypeProvider<ZodTypeProvider>().delete('/:id', {schema: getUserSchema}, async function (request, reply) {
    const id = request.params.id

    await client.execute(`
      delete User
      filter .id = <uuid>$id
    `, {id})

    return {result: 'ok'}
  })
}

export default users;
