import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHuishoudboekjeComponent } from './edit-huishoudboekje.component';

describe('EditHuishoudboekjeComponent', () => {
  let component: EditHuishoudboekjeComponent;
  let fixture: ComponentFixture<EditHuishoudboekjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHuishoudboekjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHuishoudboekjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
