import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjeEditPageComponent } from './huishoudboekje-edit-page.component';
import { ActivatedRoute } from '@angular/router';

describe('HuishoudboekjeEditPageComponent', () => {
  let component: HuishoudboekjeEditPageComponent;
  let fixture: ComponentFixture<HuishoudboekjeEditPageComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => 'huishoudboekjeId'
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [HuishoudboekjeEditPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuishoudboekjeEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
