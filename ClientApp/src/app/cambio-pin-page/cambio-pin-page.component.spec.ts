import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPinPageComponent } from './cambio-pin-page.component';

describe('CambioPinPageComponent', () => {
  let component: CambioPinPageComponent;
  let fixture: ComponentFixture<CambioPinPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPinPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
