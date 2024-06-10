import { Component } from '@angular/core';
import { Huishoudboekje } from '../../models/huishoudboekje.model';
import { HuishoudboekjeService } from '../../services/huishoudboekje/huishoudboekje.service';
import { ListHuishoudboekjeComponent } from "../../components/huishoudboekje/list-huishoudboekje/list-huishoudboekje.component";
import { CreateHuishoudboekjeComponent } from "../../components/huishoudboekje/create-huishoudboekje/create-huishoudboekje.component";
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { User } from 'firebase/auth';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-huishoudboekje-overview-page',
    standalone: true,
    templateUrl: './huishoudboekje-overview-page.component.html',
    styleUrl: './huishoudboekje-overview-page.component.scss',
    imports: [ListHuishoudboekjeComponent, CreateHuishoudboekjeComponent, NavbarComponent]
})
export class HuishoudboekjeOverviewPageComponent {
  archivedHuishoudboekjes: Huishoudboekje[] = [];
  nonArchivedHuishoudboekjes: Huishoudboekje[] = [];
  ownHuishuidboekjes: Huishoudboekje[] = [];
  currentUser: User

  ngOnInit() {
    this.authService.$currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  constructor(private huishoudboekjeService: HuishoudboekjeService, private authService: AuthService){
      
      huishoudboekjeService.getHuishoudboekjes().subscribe(huishoudboekjes => {
        if(this.currentUser){
          this.ownHuishuidboekjes = huishoudboekjes.filter(hb => hb.ownerId === this.currentUser.uid || hb.participants.includes(this.currentUser.uid))
          this.archivedHuishoudboekjes = this.ownHuishuidboekjes.filter((huishoudboekje: {archived: boolean;}) => huishoudboekje.archived)
          this.nonArchivedHuishoudboekjes = this.ownHuishuidboekjes.filter((huishoudboekje: {archived: boolean;}) => !huishoudboekje.archived)
          console.log(this.ownHuishuidboekjes)
          console.log(this.currentUser.uid)
        }
      })
    }
    
}
