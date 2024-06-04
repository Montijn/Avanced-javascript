import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { User } from 'firebase/auth';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-detail-huishoudboekje',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './detail-huishoudboekje.component.html',
  styleUrls: ['./detail-huishoudboekje.component.scss']
})
export class DetailHuishoudboekjeComponent implements OnDestroy {
  @Input() huishoudboekjeId: string;

  selected_id: string = '';
  participants: User[] = [];
  availableUsers: User[] = [];
  subscriptions: Subscription[] = [];
  huishoudboekjeForm: FormGroup;
  huishoudboekje: Huishoudboekje

  constructor(
    private huishoudboekjeService: HuishoudboekjeService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
  ) {
    this.selected_id = this.route.snapshot.paramMap.get('id') ?? '';

    const huishoudboekjeSubscription = this.huishoudboekjeService.getHuishoudboekje(this.selected_id).subscribe((huishoudboekje: any) => {
      if (huishoudboekje) {
        this.huishoudboekjeForm = this.formBuilder.group(huishoudboekje);
        this.huishoudboekje = huishoudboekje
        this.mapParticipantsToUsers(huishoudboekje.participants ?? []);
      }
    });

    const userSubscription = this.userService.$users.subscribe((users: User[]) => {
      this.availableUsers = users;
      if (this.huishoudboekjeForm) {
        this.mapParticipantsToUsers(this.huishoudboekjeForm.value.participants ?? []);
      }
    });

    this.subscriptions.push(huishoudboekjeSubscription, userSubscription);
  }

  private mapParticipantsToUsers(participantIds: string[]): void {
    this.participants = this.availableUsers.filter(user => participantIds.includes(user.uid));
    this.availableUsers = this.availableUsers.filter(user => !participantIds.includes(user.uid));
  }

  addParticipant(userId: string): void {
    console.log(userId)
    console.log(this.huishoudboekje.participants)
      if (!this.huishoudboekje.participants.includes(userId)) {
        this.huishoudboekje.participants.push(userId);
        console.log(this.huishoudboekje.participants)
        this.mapParticipantsToUsers(this.huishoudboekje.participants);
      }
  }

  removeParticipant(userId: string): void {
    // this.huishoudboekjeService.removeParticipant(this.huishoudboekjeId, userId).then(() => {
    //   const index = this.huishoudboekjeForm.value.participants.indexOf(userId);
    //   if (index !== -1) {
    //     this.huishoudboekjeForm.value.participants.splice(index, 1);
    //     this.mapParticipantsToUsers(this.huishoudboekjeForm.value.participants);
    //   }
    // });
  }

  onSave(): void {
    this.huishoudboekjeService.updateHuishoudboekje(this.huishoudboekjeForm.value).then(() => {
      console.log('Huishoudboekje updated');
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
