import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionNavigateComponent } from './question-navigate.component';

describe('QuestionNavigateComponent', () => {
  let component: QuestionNavigateComponent;
  let fixture: ComponentFixture<QuestionNavigateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
