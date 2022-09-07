import {Post, PostLike} from '$types/post';
import {client} from '../edgedb-client';
import {SavePostRequest} from './post-schema';
import {PostLikeType} from '../enums';

async function allPosts() {
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
  `, {userId: '05fbab58-28b6-11ed-b9ed-d3acf0fccf2a'}) // TODO signed userId bindging! (middleware)

  return posts
}

async function createPost(data: SavePostRequest) {
  const id = await client.querySingle<Post>(`
      insert Post {
        title := <str>$title,
        content := <str>$content,
        created_by := (select User filter .id = <uuid>$user_id)
      }
    `, data);
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
  return id
}

async function findPost(id: string) {
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
      like_count := count(.likes filter .type = <str>$like),
      dislike_count := count(.likes filter .type = <str>$dislike),
      my_like := (select .<post[is PostLike] {
        id,
        type
      } filter .user.id = <uuid>$userId)
    }
    filter .id = <uuid>$id
  `, {id, userId: '05fbab58-28b6-11ed-b9ed-d3acf0fccf2a', like: PostLikeType.Like, dislike: PostLikeType.Dislike})

  return post
}

async function deletePost(id: string) {
  await client.execute(`
      delete Post
      filter .id = <uuid>$id
    `, {id})
}

async function findPostLike(postId: string) {
  const like = await client.query<PostLike>(`
    select PostLike {
      id,
      type
    }
    filter .post.id = <uuid>$postId
    and .user.id = <uuid>$userId
  `, {postId, userId: '05fbab58-28b6-11ed-b9ed-d3acf0fccf2a'})

  return like?.[0];
}

async function updatePostLikeType(id: string, type: string) {
  const likeId = await client.execute(`
    update PostLike
    filter .id = <uuid>$id
    set {
      type := <str>$type
    }
  `, {id, type})

  return likeId
}

async function insertPostLike(postId: string, type: string) {
  const likeId = await client.execute(`
    insert PostLike {
      type := <str>$type,
      post := (select Post filter .id = <uuid>$postId),
      user := (select User filter .id = <uuid>$userId),
    }
  `, {type, postId, userId: '05fbab58-28b6-11ed-b9ed-d3acf0fccf2a'})

  return likeId
}

async function deletePostLike(id: string) {
  await client.execute(`
    delete PostLike
    filter .id = <uuid>$id
  `, {id})
}

export {
  allPosts,
  createPost,
  updatePost,
  findPost,
  deletePost,
  findPostLike,
  updatePostLikeType,
  insertPostLike,
  deletePostLike,
}
