import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjeDetailsPageComponent } from './huishoudboekje-details-page.component';

describe('HuishoudboekjeDetailsPageComponent', () => {
  let component: HuishoudboekjeDetailsPageComponent;
  let fixture: ComponentFixture<HuishoudboekjeDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuishoudboekjeDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuishoudboekjeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
