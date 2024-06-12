import { Component, Input } from '@angular/core';
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
export class EditHuishoudboekjeComponent {

  selected_id: string = '';
  allUsers: User[] = [];
  participants: User[] = [];
  availableUsers: User[] = [];
  huishoudboekje: Huishoudboekje;

  constructor(
    private huishoudboekjeService: HuishoudboekjeService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.selected_id = this.route.snapshot.paramMap.get('id') ?? '';

    // Fetch the huishoudboekje first
    this.huishoudboekjeService.getHuishoudboekje(this.selected_id).subscribe((huishoudboekje: Huishoudboekje) => {
      if (huishoudboekje) {
        this.huishoudboekje = huishoudboekje;
        this.mapParticipantsToUsers(this.huishoudboekje.participants ?? []);

      }
    });

    this.userService.$users.subscribe((users: User[]) => {
      this.allUsers = users;
      this.mapParticipantsToUsers(this.huishoudboekje.participants ?? []);
    });
  }

  private mapParticipantsToUsers(participantIds: string[]): void {
    this.participants = this.allUsers.filter(user => participantIds.includes(user.uid));
    this.availableUsers = this.allUsers.filter(user => !participantIds.includes(user.uid) && user.uid !== this.huishoudboekje.ownerId);
  }

  addParticipant(userId: string): void {
    if (!this.huishoudboekje.participants.includes(userId)) {
      this.huishoudboekje.participants.push(userId);
      this.mapParticipantsToUsers(this.huishoudboekje.participants);
    }
  }

  removeParticipant(userId: string): void {
    const index = this.huishoudboekje.participants.indexOf(userId);
    if (index !== -1) {
      this.huishoudboekje.participants.splice(index, 1);
      this.mapParticipantsToUsers(this.huishoudboekje.participants);
    }
  }

  onSave(): void {
    this.huishoudboekjeService.updateHuishoudboekje(this.huishoudboekje).then(() => {
      this.router.navigate(['/overview']);
    });
  }
}
