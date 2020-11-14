import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSaldoPageComponent } from './consulta-saldo-page.component';

describe('ConsultaSaldoPageComponent', () => {
  let component: ConsultaSaldoPageComponent;
  let fixture: ComponentFixture<ConsultaSaldoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaSaldoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSaldoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
