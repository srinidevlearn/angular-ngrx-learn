import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictorialChartComponent } from './pictorial-chart.component';

describe('PictorialChartComponent', () => {
  let component: PictorialChartComponent;
  let fixture: ComponentFixture<PictorialChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictorialChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictorialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
