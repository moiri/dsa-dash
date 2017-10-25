import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimbusComponent } from './limbus.component';

describe('LimbusComponent', () => {
  let component: LimbusComponent;
  let fixture: ComponentFixture<LimbusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimbusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
