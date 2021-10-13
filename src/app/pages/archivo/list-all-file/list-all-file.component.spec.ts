import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllFileComponent } from './list-all-file.component';

describe('ListAllFileComponent', () => {
  let component: ListAllFileComponent;
  let fixture: ComponentFixture<ListAllFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
