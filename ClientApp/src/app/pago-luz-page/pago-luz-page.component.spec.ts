import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoLuzPageComponent } from './pago-luz-page.component';

describe('PagoLuzPageComponent', () => {
  let component: PagoLuzPageComponent;
  let fixture: ComponentFixture<PagoLuzPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoLuzPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoLuzPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
