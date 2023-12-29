import { userResponse } from './user';

export interface Message {
  id: number;
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
  user: userResponse;
  edit: boolean;
}
