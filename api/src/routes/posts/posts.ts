import {FastifyPluginAsync} from 'fastify';
import {ZodTypeProvider} from 'fastify-type-provider-zod';
import {idSchema} from '../../lib/zod-schemas';
import {
  allPosts,
  createPost,
  deletePost,
  deletePostLike,
  findPost,
  findPostLike,
  insertPostLike,
  updatePost,
  updatePostLikeType
} from '../../lib/posts/post-service';
import {saveLikeRequest, savePostRequest} from '../../lib/posts/post-schema';

const posts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.get('/', async function(request, reply) {
    const posts = await allPosts()
    return posts
  })


  /**
   * insert / update post
   */
  const savePostSchema = {
    body: savePostRequest
  }
  fastify.withTypeProvider<ZodTypeProvider>().post('/', {schema: savePostSchema}, async function (request, reply) {
    const data = request.body
    let id

    if (data.id) {
      id = await updatePost(data)
    } else {
      id = await createPost(data)
    }

    reply.status(201)
    return id
  })


  /**
   * get post for :id
   */
  const getPostSchema = {
    params: idSchema
  }
  fastify.withTypeProvider<ZodTypeProvider>().get('/:id', {schema: getPostSchema}, async function (request, reply) {
    const id = request.params.id
    const post = await findPost(id)
    return post
  })

  /**
   * delete post by id
   */
  fastify.withTypeProvider<ZodTypeProvider>().delete('/:id', {schema: getPostSchema}, async function (request, reply) {
    const id = request.params.id
    await deletePost(id)
    return {result: 'ok'}
  })

  const saveLikeSchema = {
    body: saveLikeRequest,
  }

  /**
   * insert/update PostLike like/dislike
   */
  fastify.withTypeProvider<ZodTypeProvider>().post('/like', {schema: saveLikeSchema}, async function (request, reply) {
    const {id, type} = request.body

    // exists like ?
    const like = await findPostLike(id)

    // exists & different? --> update exclusive!
    if (like?.id) {
      if (like.type !== type) {
        await updatePostLikeType(like.id, type)
      }
    } else {
      await insertPostLike(id, type)
    }

    return {result: 'ok'}
  });

  /**
   * delete PostLike
   */
  const deleteLikeSchema = {
    body: idSchema,
  }
  fastify.withTypeProvider<ZodTypeProvider>().delete('/like', {schema: deleteLikeSchema}, async function (request, reply) {
    const {id} = request.body
    await deletePostLike(id)
    return {result: 'ok'}
  });
}

export default posts
