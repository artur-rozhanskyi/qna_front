import { Component, OnInit, Input } from '@angular/core';
import { Attachment } from 'src/app/shared/attachment.model';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {
  @Input() attachments: Attachment[];
  constructor() { }

  ngOnInit(): void {
  }

}
