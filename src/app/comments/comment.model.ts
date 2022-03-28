export interface Comment {
  id?: number;
  body: string;
  userId: number;
  commentableId?: number;
  commentableType?: string;
}
