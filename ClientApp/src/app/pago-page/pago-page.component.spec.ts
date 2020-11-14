import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPageComponent } from './pago-page.component';

describe('PagoPageComponent', () => {
  let component: PagoPageComponent;
  let fixture: ComponentFixture<PagoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
