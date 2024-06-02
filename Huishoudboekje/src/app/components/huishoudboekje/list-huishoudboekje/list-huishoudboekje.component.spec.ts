import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHuishoudboekjeComponent } from './list-huishoudboekje.component';

describe('ListHuishoudboekjeComponent', () => {
  let component: ListHuishoudboekjeComponent;
  let fixture: ComponentFixture<ListHuishoudboekjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHuishoudboekjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListHuishoudboekjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
