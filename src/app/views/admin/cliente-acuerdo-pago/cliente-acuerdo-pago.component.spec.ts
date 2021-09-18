import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAcuerdoPagoComponent } from './cliente-acuerdo-pago.component';

describe('ClienteAcuerdoPagoComponent', () => {
  let component: ClienteAcuerdoPagoComponent;
  let fixture: ComponentFixture<ClienteAcuerdoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteAcuerdoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteAcuerdoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
