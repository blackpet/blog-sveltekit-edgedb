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
        status,
        read_count,
        created_at,
        last_modified_at,
        created_by: {
          id,
          name,
        },
        like_count := count(.likes filter .type = 'Like'),
        dislike_count := count(.likes filter .type = 'Dislike'),
        my_like := (select .<post[is PostLike] {
          id,
          type
        } filter .user.id = <uuid>$userId)
      } order by .created_at desc
    `, {userId: '05fbab58-28b6-11ed-b9ed-d3acf0fccf2a'}) // TODO signed userId bindging!

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
    const {user_id, ...rest} = data
    const id = await client.querySingle<Post>(`
      update Post 
      filter .id = <uuid>$id
      set {
        title := <str>$title,
        content := <str>$content,
        last_modified_at := datetime_current(),
      }
    `, rest);
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
        status,
        read_count,
        created_at,
        last_modified_at,
        created_by: {
          id,
          name,
        },
        likes: {
          created_at,
          type,
          user: {
            name
          }
        } order by .created_at desc,
        like_count := count(.likes filter .type = 'Like'),
        dislike_count := count(.likes filter .type = 'Dislike'),
        my_like := (select .<post[is PostLike] {
          id,
          type
        } filter .user.id = <uuid>$userId)
      }
      filter .id = <uuid>$id
    `, {id, userId: '05fbab58-28b6-11ed-b9ed-d3acf0fccf2a'})

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
