import { Attachment } from '../shared/attachment.model';

export interface Answer {
  id?: number;
  body: string;
  attachments?: Attachment[];
  questionId: number;
  userId: number
}
