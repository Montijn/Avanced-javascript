import { Component } from '@angular/core';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { FormsModule } from '@angular/forms';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-create-huishoudboekje',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './create-huishoudboekje.component.html',
  styleUrl: './create-huishoudboekje.component.scss'
})
export class CreateHuishoudboekjeComponent {
  constructor(private huishoudboekjeService: HuishoudboekjeService, private authService: AuthService){
  }
  huishoudboekje: Huishoudboekje ={
    name: '',
    description: '',
    ownerId: '',
    archived: false,
    id:''
  }
  onAdd() {
    if (this.huishoudboekje.name != "") {
      const ownerId = this.authService.currentUser?.uid
      this.huishoudboekje.ownerId = 'test';
      this.huishoudboekje.archived = false;
      this.huishoudboekjeService.addHuishoudboekje(this.huishoudboekje);
    }
    this.huishoudboekje = {
      name: '',
      description: '',
      ownerId: '',
      archived: false,
      id:''
    };
  }
}
