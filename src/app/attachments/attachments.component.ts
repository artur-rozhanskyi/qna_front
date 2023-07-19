import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attachment } from '../shared/attachment.model';
import { environment } from 'src/environments/environment';
import { UntypedFormBuilder } from '@angular/forms';
import { IFile } from '../shared/file.model';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  @Output() files = new EventEmitter<{}>();
  @Input() attachments: Attachment[];
  @Input() isEdit = false;
  filesInputs = this.fb.array([]);
  filesObject: IFile[] = [];
  attachmentMaxCount: number = environment.attachmentMaxCount;

  onFileChange(event, i: number) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.filesInputs.controls[i].patchValue({ file: reader.result });
        this.filesObject.push({ file: reader.result });
        this.emitFiles();
      };
    }
  }

  emitFiles() {
    this.files.emit({ ...this.filesObject } as IFile);
  }

  onAddFile() {
    this.filesInputs.push(this.fb.control({ file: '' }));
  }

  onDeleteFile(i: number) {
    this.filesInputs.removeAt(i);
  }

  onChecked(event, attachmentId: number) {
    if (event.target.checked) {
      this.filesObject.push({
        id: attachmentId,
        _destroy: (+event.target.checked).toString(),
      } as IFile);
    } else {
      this.filesObject = this.filesObject.filter(
        (file) => file.id !== attachmentId
      );
    }
    this.emitFiles();
  }

  isBiggerUp(): boolean {
    return (
      this.attachments.length + this.filesInputs.length >=
      this.attachmentMaxCount
    );
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {}
}
