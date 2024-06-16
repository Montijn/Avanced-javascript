import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListHuishoudboekjeComponent } from './list-huishoudboekje.component';
import { User } from 'firebase/auth';
import { of } from 'rxjs';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
const huishoudboekjeServiceMock = {
  deleteHuishoudboekje: jasmine.createSpy('deleteHuishoudboekje'),
  updateHuishoudboekje: jasmine.createSpy('updateHuishoudboekje')
};

const authServiceMock = {
  $currentUser: of({ uid: 'user1', displayName: 'Test User' } as User)
};

const mockHuishoudboekjes: Huishoudboekje[] = [
  { id: '1', name: 'Test Huishoudboekje 1', participants: [], description: '', ownerId: '', archived: false },
  { id: '2', name: 'Test Huishoudboekje 2', participants: [], description: '', ownerId: '', archived: true }
];

let mockActivatedRoute: any;

describe('ListHuishoudboekjeComponent', () => {
  let component: ListHuishoudboekjeComponent;
  let fixture: ComponentFixture<ListHuishoudboekjeComponent>;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => 'categoryId'
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatListModule, MatCardModule, MatButtonModule],
      providers: [
        { provide: HuishoudboekjeService, useValue: huishoudboekjeServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListHuishoudboekjeComponent);
    component = fixture.componentInstance;
    component.huishoudboekjes = mockHuishoudboekjes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deArchive a huishoudboekje', () => {
    const huishoudboekjeId = '2';
    component.deArchiveProject(huishoudboekjeId);
    expect(huishoudboekjeServiceMock.updateHuishoudboekje).toHaveBeenCalledWith({
      id: huishoudboekjeId,
      name: 'Test Huishoudboekje 2',
      participants: [],
      description: '',
      ownerId: '',
      archived: false
    } as Huishoudboekje);
  });

  it('should archive a huishoudboekje', () => {
    const huishoudboekjeId = '1';
    component.archiveProject(huishoudboekjeId);
    expect(huishoudboekjeServiceMock.updateHuishoudboekje).toHaveBeenCalledWith({
      id: huishoudboekjeId,
      name: 'Test Huishoudboekje 1',
      participants: [],
      description: '',
      ownerId: '',
      archived: true
    } as Huishoudboekje);
  });

  it('should delete a huishoudboekje', () => {
    const huishoudboekjeToDelete = mockHuishoudboekjes[0];
    component.onDelete(huishoudboekjeToDelete);
    expect(huishoudboekjeServiceMock.deleteHuishoudboekje).toHaveBeenCalledWith(huishoudboekjeToDelete);
  });
});
