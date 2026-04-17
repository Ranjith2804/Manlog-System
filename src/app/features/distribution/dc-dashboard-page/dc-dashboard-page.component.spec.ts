import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcDashboardPageComponent } from './dc-dashboard-page.component';

describe('DcDashboardPageComponent', () => {
  let component: DcDashboardPageComponent;
  let fixture: ComponentFixture<DcDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcDashboardPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DcDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
