import { Component, OnInit, Input } from '@angular/core';
import { Attachment } from 'src/app/shared/attachment.model';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Input() attachment: Attachment;
  constructor() { }

  ngOnInit(): void {
  }

}
