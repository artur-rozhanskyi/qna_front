import { Attachment } from '../shared/attachment.model';
import { Answer } from '../answers/answer.interface';

export interface Question {
  id?: number;
  title: string;
  body: string;
  answers?: Answer[];
  attachments?: Attachment[];
  userId: number;
}
