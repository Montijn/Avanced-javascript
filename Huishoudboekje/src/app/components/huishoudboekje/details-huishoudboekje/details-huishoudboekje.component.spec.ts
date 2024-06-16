import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsHuishoudboekjeComponent } from './details-huishoudboekje.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { UserService } from '../../../services/user/user.service';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { User } from 'firebase/auth';
import { of } from 'rxjs';

describe('DetailsHuishoudboekjeComponent', () => {
  let component: DetailsHuishoudboekjeComponent;
  let fixture: ComponentFixture<DetailsHuishoudboekjeComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockHuishoudboekjeService: jasmine.SpyObj<HuishoudboekjeService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockHuishoudboekje: Huishoudboekje = {
    id: '1',
    name: 'Test Huishoudboekje',
    participants: ['user1', 'user2'],
    description: '',
    ownerId: '',
    archived: false
  };

  const mockUsers = [
    { uid: 'user1', displayName: 'User 1' },
    { uid: 'user2', displayName: 'User 2' },
    { uid: 'user3', displayName: 'User 3' }
  ];

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockHuishoudboekjeService = jasmine.createSpyObj('HuishoudboekjeService', ['getHuishoudboekje']);
    mockHuishoudboekjeService.getHuishoudboekje.and.returnValue(of(mockHuishoudboekje));

    mockUserService = jasmine.createSpyObj('UserService', ['getUser']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: HuishoudboekjeService, useValue: mockHuishoudboekjeService },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsHuishoudboekjeComponent);
    component = fixture.componentInstance;

    mockUserService.$users = of(mockUsers);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch huishoudboekje details on init', () => {
    expect(component.huishoudboekje).toEqual(mockHuishoudboekje);
    expect(component.participants.length).toEqual(2);
  });

  it('should map participant ids to users', () => {
    component.mapParticipantsToUsers(['user1', 'user2']);
    expect(component.participants.length).toEqual(2);
    expect(component.participants[0].displayName).toEqual('User 1');
    expect(component.participants[1].displayName).toEqual('User 2');
  });
});
