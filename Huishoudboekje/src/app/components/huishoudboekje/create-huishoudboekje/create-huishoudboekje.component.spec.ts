import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHuishoudboekjeComponent } from './create-huishoudboekje.component';
import { FormsModule } from '@angular/forms';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';


let mockHuishoudboekjeService = {
  addHuishoudboekje: () => {}
}; 
describe('CreateHuishoudboekjeComponent', () => {
  let component: CreateHuishoudboekjeComponent;
  let fixture: ComponentFixture<CreateHuishoudboekjeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: HuishoudboekjeService, useValue: mockHuishoudboekjeService },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHuishoudboekjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call addHuishoudboekje method of HuishoudboekjeService when onAdd is called', () => {
    let spy = spyOn(mockHuishoudboekjeService, 'addHuishoudboekje').and.callThrough();

    component.huishoudboekje = {
      id: '',
      name: 'Test',
      archived: false,
      description: 'Test',
      ownerId: '',
      participants: []
    };

    component.onAdd();

    expect(spy).toHaveBeenCalled();
  });
});
