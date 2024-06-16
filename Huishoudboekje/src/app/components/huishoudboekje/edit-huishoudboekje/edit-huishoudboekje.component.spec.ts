import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHuishoudboekjeComponent } from './edit-huishoudboekje.component';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

describe('EditHuishoudboekjeComponent', () => {
  let component: EditHuishoudboekjeComponent;
  let fixture: ComponentFixture<EditHuishoudboekjeComponent>;
  let mockHuishoudboekjeService: jasmine.SpyObj<HuishoudboekjeService>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    mockHuishoudboekjeService = jasmine.createSpyObj('HuishoudboekjeService', ['getHuishoudboekje', 'updateHuishoudboekje'])
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => 'huishoudboekjeId'
        }
      }
    };

    mockHuishoudboekjeService.getHuishoudboekje.and.returnValue(of({
      id: 'huishoudboekjeId',
      archived: false,
      description: 'Test',
      name: 'Test',
      ownerId: '',
      participants: []
    } as Huishoudboekje));

    await TestBed.configureTestingModule({
      imports: [NgIf, NgFor, FormsModule ],
      providers: [
        { provide: HuishoudboekjeService, useValue: mockHuishoudboekjeService},
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHuishoudboekjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call updateCategory method of CategoryService when onSave is called', async () => {
    const huishoudboekje: Huishoudboekje = {
      id: 'huishoudboekjeId',
      archived: false,
      description: 'TestTest',
      name: 'Test',
      ownerId: '',
      participants: []
    };

    component.huishoudboekje = huishoudboekje;

    mockHuishoudboekjeService.updateHuishoudboekje.and.returnValue(Promise.resolve());

    await component.onSave();

    expect(mockHuishoudboekjeService.updateHuishoudboekje).toHaveBeenCalledWith(component.huishoudboekje);
  });
});
