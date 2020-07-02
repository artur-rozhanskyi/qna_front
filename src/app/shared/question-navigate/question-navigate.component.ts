import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { Role } from '../role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-navigate',
  templateUrl: './question-navigate.component.html',
  styleUrls: ['./question-navigate.component.scss'],
})
export class QuestionNavigateComponent implements OnInit {
  isAuthenticated = false;
  Role = Role;
  currentRoute: string;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.store.pipe(select('auth')).subscribe((authState) => {
      this.isAuthenticated = authState.authenticated;
    });
  }
}
