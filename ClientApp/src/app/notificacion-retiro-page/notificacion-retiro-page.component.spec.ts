import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionRetiroPageComponent } from './notificacion-retiro-page.component';

describe('NotificacionRetiroPageComponent', () => {
  let component: NotificacionRetiroPageComponent;
  let fixture: ComponentFixture<NotificacionRetiroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionRetiroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionRetiroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
