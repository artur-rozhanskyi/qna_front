import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../answer.interface';
import { Role } from '../../shared/role';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer;
  Role = Role;
  isEditOpen = false;
  onDelete = () => {
    this.api.deleteAnswer(this.answer).subscribe();
  };

  onEditOpen(event: boolean) {
    this.isEditOpen = event;
  }

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
