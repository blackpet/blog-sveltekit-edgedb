import {z} from 'zod';

export const savePostRequest = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  user_id: z.string().uuid()
})
export type SavePostRequest = z.infer<typeof savePostRequest>

export const saveLikeRequest = z.object({
  id: z.string().uuid(),
  type: z.string(),
})
