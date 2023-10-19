import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageLayoutComponent } from './landingpage-layout.component';

describe('LandingpageLayoutComponent', () => {
  let component: LandingpageLayoutComponent;
  let fixture: ComponentFixture<LandingpageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
