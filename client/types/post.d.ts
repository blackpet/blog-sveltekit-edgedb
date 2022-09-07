import {User} from './user';
import {PostLikeType} from '../src/lib/enums';

export interface Post {
  id?: string
  title: string
  content: string
  read_count: number
  status: 'Draft' | 'InReview' | 'Published'
  created_by?: User
  created_at?: Date
  last_modified_at?: Date
  likes?: PostLike
  like_count?: number
  dislike_count?: number
  my_like?: [{
    id: string
    type: PostLikeType
  }]
}

export interface PostLike {
  id?: string
  post?: Post
  user: User
  type: PostLikeType
  created_at?: Date
}
