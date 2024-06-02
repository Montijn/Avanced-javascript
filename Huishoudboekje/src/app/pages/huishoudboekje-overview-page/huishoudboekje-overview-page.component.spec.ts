import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjeOverviewPageComponent } from './huishoudboekje-overview-page.component';

describe('HuishoudboekjeOverviewPageComponent', () => {
  let component: HuishoudboekjeOverviewPageComponent;
  let fixture: ComponentFixture<HuishoudboekjeOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuishoudboekjeOverviewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuishoudboekjeOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
