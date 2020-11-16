import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoConfirmacionPageComponent } from './deposito-confirmacion-page.component';

describe('DepositoConfirmacionPageComponent', () => {
  let component: DepositoConfirmacionPageComponent;
  let fixture: ComponentFixture<DepositoConfirmacionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoConfirmacionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoConfirmacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
