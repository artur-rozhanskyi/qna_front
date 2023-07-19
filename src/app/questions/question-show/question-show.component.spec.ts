import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionShowComponent } from './question-show.component';

describe('QuestionShowComponent', () => {
  let component: QuestionShowComponent;
  let fixture: ComponentFixture<QuestionShowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
