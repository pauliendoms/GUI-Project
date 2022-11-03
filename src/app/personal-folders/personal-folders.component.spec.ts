import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFoldersComponent } from './personal-folders.component';

describe('PersonalFoldersComponent', () => {
  let component: PersonalFoldersComponent;
  let fixture: ComponentFixture<PersonalFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
