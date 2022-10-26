import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizviewComponent } from './quizview.component';

describe('QuizviewComponent', () => {
  let component: QuizviewComponent;
  let fixture: ComponentFixture<QuizviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
