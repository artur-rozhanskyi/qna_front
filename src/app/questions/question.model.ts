import { Attachment } from '../shared/attachment.model';

export interface Question {
  id?: number;
  title: string;
  body: string;
  answers?: [];
  attachments?: Attachment[];
}
