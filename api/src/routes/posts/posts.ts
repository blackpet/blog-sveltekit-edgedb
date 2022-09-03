import {FastifyPluginAsync} from 'fastify';
import {client} from '../../lib/edgedb-client';
import {Post} from '$types/post';
import {z} from 'zod';
import {ZodTypeProvider} from 'fastify-type-provider-zod';

const posts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.get('/', async function(request, reply) {
    const posts: Post[] = await client.query(`
      select Post {
        id,
        title,
        content,
        read_count,
        created_at,
        last_modified_at,
        created_by: {
          id,
          name,
        }
      }
    `)

    return posts
  })


  /**
   * insert / update post
   */
  const savePostRequest = z.object({
    id: z.string().uuid().optional(),
    title: z.string(),
    content: z.string(),
    user_id: z.string().uuid()
  })
  type SavePostRequest = z.infer<typeof savePostRequest>
  const savePostSchema = {
    body: savePostRequest
  }
  fastify.withTypeProvider<ZodTypeProvider>().post('/', {schema: savePostSchema}, async function (request, reply) {
    const data = request.body
    console.log('body', data)
    let id

    if (data.id) {
      id = await updatePost(data)
    } else {
      id = await createPost(data)
    }

    reply.status(201)
    return id
  })

  async function createPost(data: SavePostRequest) {
    const id = await client.querySingle<Post>(`
      insert Post {
        title := <str>$title,
        content := <str>$content,
        created_by := (select User filter .id = <uuid>$user_id)
      }
    `, data);
    console.log('POST createPost /posts/ id', id)
    return id
  }

  async function updatePost(data: SavePostRequest) {
    const id = await client.querySingle<Post>(`
      update Post 
      filter .id = <uuid>$id
      set {
        title := <str>$title,
        content := <str>$content,
        last_modified_at := datetime_current(),
      }
    `, data);
    console.log('POST updatePost /posts/ id', id)
    return id
  }

  /**
   * get post
   */
  const getPostRequest = z.object({
    id: z.string().uuid(),
  })
  const getPostSchema = {
    params: getPostRequest
  }
  fastify.withTypeProvider<ZodTypeProvider>().get('/:id', {schema: getPostSchema}, async function (request, reply) {
    const id = request.params.id

    const post: Post = await client.queryRequiredSingle<Post>(`
      select Post {
        id,
        title,
        content,
        read_count,
        created_at,
        last_modified_at,
        created_by: {
          id,
          name,
        },
      }
      filter .id = <uuid>$id
    `, {id})

    return post
  })

  fastify.withTypeProvider<ZodTypeProvider>().delete('/:id', {schema: getPostSchema}, async function (request, reply) {
    const id = request.params.id

    await client.execute(`
      delete Post
      filter .id = <uuid>$id
    `, {id})

    return {result: 'ok'}
  })
}

export default posts
