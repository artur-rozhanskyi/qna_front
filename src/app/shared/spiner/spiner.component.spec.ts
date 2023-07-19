import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpinerComponent } from './spiner.component';

describe('SpinerComponent', () => {
  let component: SpinerComponent;
  let fixture: ComponentFixture<SpinerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
