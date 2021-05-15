import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvChartComponent } from './uv-chart.component';

describe('UvChartComponent', () => {
  let component: UvChartComponent;
  let fixture: ComponentFixture<UvChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
