import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionPinPageComponent } from './notificacion-pin-page.component';

describe('NotificacionPinPageComponent', () => {
  let component: NotificacionPinPageComponent;
  let fixture: ComponentFixture<NotificacionPinPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionPinPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionPinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
