import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteContratoComponent } from './cliente-contrato.component';

describe('ClienteContratoComponent', () => {
  let component: ClienteContratoComponent;
  let fixture: ComponentFixture<ClienteContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
