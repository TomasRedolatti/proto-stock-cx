import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletComponent } from './tablet';

describe('Tablet', () => {
  let component: TabletComponent;
  let fixture: ComponentFixture<TabletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
