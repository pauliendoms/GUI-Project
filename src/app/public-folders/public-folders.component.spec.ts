import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFoldersComponent } from './public-folders.component';

describe('PublicFoldersComponent', () => {
  let component: PublicFoldersComponent;
  let fixture: ComponentFixture<PublicFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
