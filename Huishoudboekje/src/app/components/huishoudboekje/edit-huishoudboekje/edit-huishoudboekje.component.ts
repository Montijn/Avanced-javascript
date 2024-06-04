import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule, UntypedFormBuilder } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { User } from 'firebase/auth';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-edit-huishoudboekje',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './edit-huishoudboekje.component.html',
  styleUrls: ['./edit-huishoudboekje.component.scss']
})
export class EditHuishoudboekjeComponent implements OnDestroy {


  selected_id: string = '';
  allUsers: User[] = [];
  participants: User[] = [];
  availableUsers: User[] = [];
  subscriptions: Subscription[] = [];
  huishoudboekje: Huishoudboekje

  constructor(
    private huishoudboekjeService: HuishoudboekjeService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.selected_id = this.route.snapshot.paramMap.get('id') ?? '';

    const huishoudboekjeSubscription = this.huishoudboekjeService.getHuishoudboekje(this.selected_id).subscribe((huishoudboekje: any) => {
      if (huishoudboekje) {
        this.huishoudboekje = huishoudboekje
        this.mapParticipantsToUsers(huishoudboekje.participants ?? []);
      }
    });

    const userSubscription = this.userService.$users.subscribe((users: User[]) => {
      this.allUsers = users;
      if (this.huishoudboekje) {
        this.mapParticipantsToUsers(this.huishoudboekje.participants ?? []);
      }
    });

    this.subscriptions.push(huishoudboekjeSubscription, userSubscription);
  }

  private mapParticipantsToUsers(participantIds: string[]): void {
    this.participants = this.allUsers.filter(user => participantIds.includes(user.uid));
    console.log(this.huishoudboekje.participants)
    this.availableUsers = this.allUsers.filter(user => !participantIds.includes(user.uid));
  }

  addParticipant(userId: string): void {
      if (!this.huishoudboekje.participants.includes(userId)) {
        this.huishoudboekje.participants.push(userId);
        console.log(this.huishoudboekje.participants)
        this.mapParticipantsToUsers(this.huishoudboekje.participants);
      }
  }

  removeParticipant(userId: string): void {
    const index = this.huishoudboekje.participants.indexOf(userId);
    if (index !== -1) {
      this.huishoudboekje.participants.splice(index, 1);
      this.mapParticipantsToUsers(this.huishoudboekje.participants);
      console.log('Participant removed:', userId);
    } else {
      console.error('Attempted to remove a participant not in the list:', userId);
    }
  }
  

  onSave(): void {
    this.huishoudboekjeService.updateHuishoudboekje(this.huishoudboekje).then(() => {
      console.log('Huishoudboekje updated');
    });
    this.router.navigate(['/overview']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
