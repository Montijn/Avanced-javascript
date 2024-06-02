import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHuishoudboekjeComponent } from './detail-huishoudboekje.component';

describe('DetailHuishoudboekjeComponent', () => {
  let component: DetailHuishoudboekjeComponent;
  let fixture: ComponentFixture<DetailHuishoudboekjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailHuishoudboekjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailHuishoudboekjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
