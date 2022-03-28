type Destroy = '1';

export interface IFile {
  id?: number;
  file?: string | ArrayBuffer;
  _destroy?: Destroy;
}
