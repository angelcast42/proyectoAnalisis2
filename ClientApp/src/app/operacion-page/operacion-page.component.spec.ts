import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionPageComponent } from './operacion-page.component';

describe('OperacionPageComponent', () => {
  let component: OperacionPageComponent;
  let fixture: ComponentFixture<OperacionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
