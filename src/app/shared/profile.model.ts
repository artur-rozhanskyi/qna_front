export interface Profile {
  id?: number;
  firstName?: string;
  lastName?: string;
  avatar?: {
    data: string | ArrayBuffer;
    filename: string;
  };
}
