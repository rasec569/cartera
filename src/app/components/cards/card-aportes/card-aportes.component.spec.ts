import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAportesComponent } from './card-aportes.component';

describe('CardAportesComponent', () => {
  let component: CardAportesComponent;
  let fixture: ComponentFixture<CardAportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
