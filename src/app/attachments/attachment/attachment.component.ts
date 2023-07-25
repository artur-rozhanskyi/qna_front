import { Component, OnInit, Input } from '@angular/core';
import { Attachment } from '../../shared/attachment.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent {
  @Input() attachment: Attachment;
  host = environment.apiUrl;

  onClick(): void {
    window.open(`${this.host}${this.attachment.url}`);
  }

  getFile(): string {
    return `${this.host}/${this.attachment.url}`;
  }

  getType(): string {
    return this.attachment.contentType.split('/')[0];
  }
}
