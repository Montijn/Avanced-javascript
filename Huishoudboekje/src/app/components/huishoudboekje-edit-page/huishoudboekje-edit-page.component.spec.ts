import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjeEditPageComponent } from './huishoudboekje-edit-page.component';

describe('HuishoudboekjeEditPageComponent', () => {
  let component: HuishoudboekjeEditPageComponent;
  let fixture: ComponentFixture<HuishoudboekjeEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuishoudboekjeEditPageComponent]
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
