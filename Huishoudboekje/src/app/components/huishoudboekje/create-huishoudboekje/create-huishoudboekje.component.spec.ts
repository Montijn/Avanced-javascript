import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHuishoudboekjeComponent } from './create-huishoudboekje.component';

describe('CreateHuishoudboekjeComponent', () => {
  let component: CreateHuishoudboekjeComponent;
  let fixture: ComponentFixture<CreateHuishoudboekjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHuishoudboekjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHuishoudboekjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
