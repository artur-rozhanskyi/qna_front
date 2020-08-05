import { Attachment } from '../shared/attachment.model';
import { Comment } from '../comments/comment.model';

export interface Answer {
  id?: number;
  body: string;
  attachments?: Attachment[];
  comments?: Comment[];
  questionId: number;
  userId: number;
}
