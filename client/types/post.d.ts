import {User} from './user';

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
    type: 'Like' | 'Dislike'
  }]
}

export interface PostLike {
  id?: string
  post?: Post
  user: User
  type: 'Like' | 'Dislike'
  created_at?: Date
}
