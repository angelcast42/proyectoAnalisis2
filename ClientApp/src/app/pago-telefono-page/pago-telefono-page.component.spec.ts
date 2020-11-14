import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoTelefonoPageComponent } from './pago-telefono-page.component';

describe('PagoTelefonoPageComponent', () => {
  let component: PagoTelefonoPageComponent;
  let fixture: ComponentFixture<PagoTelefonoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoTelefonoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoTelefonoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
