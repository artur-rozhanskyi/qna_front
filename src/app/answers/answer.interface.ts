import { Attachment } from '../shared/attachment.model';
import { Comment } from '../comments/comment.model';
import { IFile } from '../shared/file.model';


export interface Answer {
  id?: number;
  body: string;
  attachments?: Attachment[];
  attachmentsAttributes?: IFile;
  comments?: Comment[];
  questionId: number;
  userId: number;
}
