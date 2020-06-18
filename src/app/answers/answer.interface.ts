import { Attachment } from '../shared/attachment.model';

export interface Answer {
  body: string;
  attachments: Attachment[];
  question_id?: number;
}
