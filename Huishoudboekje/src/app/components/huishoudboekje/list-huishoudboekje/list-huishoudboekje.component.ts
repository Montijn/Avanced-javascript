import { Component, Input } from '@angular/core';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule} from '@angular/material/card'
import { MatButtonModule} from '@angular/material/button'
import { User } from 'firebase/auth';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-list-huishoudboekje',
  standalone: true,
  imports: [MatListModule,MatCardModule, MatButtonModule, NgFor, RouterModule, NgIf, NgClass],
  templateUrl: './list-huishoudboekje.component.html',
  styleUrl: './list-huishoudboekje.component.scss'
})
export class ListHuishoudboekjeComponent {

  @Input()
  huishoudboekjes: Huishoudboekje[] = [];
  
  
  currentUser: User

  
  constructor(private huishoudboekjeService: HuishoudboekjeService, private authService: AuthService){
  }

  ngOnInit() {
    this.authService.$currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onDelete(huishoudboekje: Huishoudboekje) {
    this.huishoudboekjeService.deleteHuishoudboekje(huishoudboekje);
  }

  deArchiveProject(huishoudboekjeId: string){
    const huishoudboekje = this.huishoudboekjes.find(hb => hb.id === huishoudboekjeId);
    if(huishoudboekje){
      huishoudboekje.archived = false;
      this.huishoudboekjeService.updateHuishoudboekje(huishoudboekje);
    }
  }
  archiveProject(huishoudboekjeId: string){
    const huishoudboekje = this.huishoudboekjes.find(hb => hb.id === huishoudboekjeId);
    if(huishoudboekje){
      huishoudboekje.archived = true;
      this.huishoudboekjeService.updateHuishoudboekje(huishoudboekje);
    }
  }

}
