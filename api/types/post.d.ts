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
}
