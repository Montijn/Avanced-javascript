import { Component } from '@angular/core';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { NgFor, NgIf } from '@angular/common';
import { User } from 'firebase/auth';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-details-huishoudboekje',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './details-huishoudboekje.component.html',
  styleUrl: './details-huishoudboekje.component.scss'
})
export class DetailsHuishoudboekjeComponent {
 huishoudboekje: Huishoudboekje
 huishoudboekjeId: string
 allUsers: User[] = [];
 participants: User[] = [];
 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private huishoudboekjeService: HuishoudboekjeService,
  private userService: UserService
  ) 
  {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get('id') ?? '';
    if(this.huishoudboekjeId == null){
      this.router.navigate(['/overview']);
    }

  }
 ngOnInit(){
  this.huishoudboekjeService.getHuishoudboekje(this.huishoudboekjeId).subscribe((huishoudboekje: Huishoudboekje) => {
    if (huishoudboekje) {
      this.huishoudboekje = huishoudboekje
      this.mapParticipantsToUsers(huishoudboekje.participants ?? []);
    }
  });

  this.userService.$users.subscribe((users: User[]) => {
    this.allUsers = users;
    if (this.huishoudboekje) {
      this.mapParticipantsToUsers(this.huishoudboekje.participants ?? []);
    }
  });
 }
  public mapParticipantsToUsers(participantIds: string[]): void {
    this.participants = this.allUsers.filter(user => participantIds.includes(user.uid));
  }

}
