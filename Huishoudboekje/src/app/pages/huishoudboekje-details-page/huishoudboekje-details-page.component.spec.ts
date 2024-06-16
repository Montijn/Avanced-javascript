import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjeDetailsPageComponent } from './huishoudboekje-details-page.component';
import { ActivatedRoute } from '@angular/router';

describe('HuishoudboekjeDetailsPageComponent', () => {
  let component: HuishoudboekjeDetailsPageComponent;
  let fixture: ComponentFixture<HuishoudboekjeDetailsPageComponent>;
  let mockActivatedRoute: any;
  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [HuishoudboekjeDetailsPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
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
