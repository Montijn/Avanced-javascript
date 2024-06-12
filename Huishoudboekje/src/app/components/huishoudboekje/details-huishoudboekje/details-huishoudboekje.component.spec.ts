import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHuishoudboekjeComponent } from './details-huishoudboekje.component';

describe('DetailsHuishoudboekjeComponent', () => {
  let component: DetailsHuishoudboekjeComponent;
  let fixture: ComponentFixture<DetailsHuishoudboekjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsHuishoudboekjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsHuishoudboekjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
