import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMontoPageComponent } from './pago-monto-page.component';

describe('PagoMontoPageComponent', () => {
  let component: PagoMontoPageComponent;
  let fixture: ComponentFixture<PagoMontoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMontoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMontoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
