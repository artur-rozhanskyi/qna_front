import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manage-button',
  templateUrl: './manage-button.component.html',
  styleUrls: ['./manage-button.component.scss']
})
export class ManageButtonComponent implements OnInit {
  @Input() editLink: string = '';
  @Input() deleteLink: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
