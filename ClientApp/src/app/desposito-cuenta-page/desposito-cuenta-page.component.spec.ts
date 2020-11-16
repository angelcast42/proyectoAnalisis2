import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespositoCuentaPageComponent } from './desposito-cuenta-page.component';

describe('DespositoCuentaPageComponent', () => {
  let component: DespositoCuentaPageComponent;
  let fixture: ComponentFixture<DespositoCuentaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespositoCuentaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespositoCuentaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
