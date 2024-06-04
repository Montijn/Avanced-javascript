import { Component } from '@angular/core';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { FormsModule } from '@angular/forms';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { AuthService } from '../../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-huishoudboekje',
  standalone: true,
  imports: [
    FormsModule,NgIf
  ],
  templateUrl: './create-huishoudboekje.component.html',
  styleUrl: './create-huishoudboekje.component.scss'
})
export class CreateHuishoudboekjeComponent {

  currentUserId: string
  constructor(private huishoudboekjeService: HuishoudboekjeService, private authService: AuthService){
    this.authService.$currentUser.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
      }
    });
  }
  huishoudboekje: Huishoudboekje ={
    name: '',
    description: '',
    ownerId: '',
    archived: false,
    id:'',
    participants: []
  }
  onAdd() {
    if (this.huishoudboekje.name != "") {
      this.huishoudboekje.ownerId =  this.currentUserId;
      this.huishoudboekje.archived = false;
      this.huishoudboekje.participants =[this.currentUserId];
      this.huishoudboekjeService.addHuishoudboekje(this.huishoudboekje);
    }
    this.huishoudboekje = {
      name: '',
      description: '',
      ownerId: '',
      archived: false,
      id:'',
      participants: []
    };
  }
}
