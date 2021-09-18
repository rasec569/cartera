import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardObligacionComponent } from './card-obligacion.component';

describe('CardObligacionComponent', () => {
  let component: CardObligacionComponent;
  let fixture: ComponentFixture<CardObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardObligacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
