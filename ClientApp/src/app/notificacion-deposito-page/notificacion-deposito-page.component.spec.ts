import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionDepositoPageComponent } from './notificacion-deposito-page.component';

describe('NotificacionDepositoPageComponent', () => {
  let component: NotificacionDepositoPageComponent;
  let fixture: ComponentFixture<NotificacionDepositoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionDepositoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionDepositoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
