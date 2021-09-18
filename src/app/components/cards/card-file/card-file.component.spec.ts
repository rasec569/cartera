import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFileComponent } from './card-file.component';

describe('CardFileComponent', () => {
  let component: CardFileComponent;
  let fixture: ComponentFixture<CardFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
