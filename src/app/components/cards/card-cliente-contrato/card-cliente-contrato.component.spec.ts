import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClienteContratoComponent } from './card-cliente-contrato.component';

describe('CardClienteContratoComponent', () => {
  let component: CardClienteContratoComponent;
  let fixture: ComponentFixture<CardClienteContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardClienteContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardClienteContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
