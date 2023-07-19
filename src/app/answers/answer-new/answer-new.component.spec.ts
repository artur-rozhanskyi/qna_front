import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnswerNewComponent } from './answer-new.component';

describe('AnswerNewComponent', () => {
  let component: AnswerNewComponent;
  let fixture: ComponentFixture<AnswerNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
