import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleStatsComponent } from './circle-stats.component';

describe('CircleStatsComponent', () => {
  let component: CircleStatsComponent;
  let fixture: ComponentFixture<CircleStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
