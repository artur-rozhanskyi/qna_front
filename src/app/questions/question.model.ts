import { Attachment } from '../shared/attachment.model';
import { Answer } from '../answers/answer.interface';
import { Comment } from '../comments/comment.model';
import { IFile } from '../shared/file.model';

export interface Question {
  id?: number;
  title: string;
  body: string;
  answers?: Answer[];
  attachments?: Attachment[];
  attachmentsAttributes?: IFile;
  comments?: Comment[];
  userId: number;
}
