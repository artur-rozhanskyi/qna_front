import { Attachment } from '../shared/attachment.model';
import { Answer } from '../answers/answer.interface';
import { Comment } from '../comments/comment.model';

export interface Question {
  id?: number;
  title: string;
  body: string;
  answers?: Answer[];
  attachments?: Attachment[];
  comments?: Comment[];
  userId: number;
}
