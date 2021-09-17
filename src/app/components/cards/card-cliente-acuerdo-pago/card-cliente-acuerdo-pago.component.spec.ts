import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClienteAcuerdoPagoComponent } from './card-cliente-acuerdo-pago.component';

describe('CardClienteAcuerdoPagoComponent', () => {
  let component: CardClienteAcuerdoPagoComponent;
  let fixture: ComponentFixture<CardClienteAcuerdoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardClienteAcuerdoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardClienteAcuerdoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
