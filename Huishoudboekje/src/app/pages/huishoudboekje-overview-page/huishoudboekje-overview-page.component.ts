import { Component } from '@angular/core';
import { Huishoudboekje } from '../../models/huishoudboekje.model';
import { HuishoudboekjeService } from '../../services/huishoudboekje/huishoudboekje.service';
import { ListHuishoudboekjeComponent } from "../../components/huishoudboekje/list-huishoudboekje/list-huishoudboekje.component";
import { CreateHuishoudboekjeComponent } from "../../components/huishoudboekje/create-huishoudboekje/create-huishoudboekje.component";

@Component({
    selector: 'app-huishoudboekje-overview-page',
    standalone: true,
    templateUrl: './huishoudboekje-overview-page.component.html',
    styleUrl: './huishoudboekje-overview-page.component.scss',
    imports: [ListHuishoudboekjeComponent, CreateHuishoudboekjeComponent]
})
export class HuishoudboekjeOverviewPageComponent {
  archivedHuishoudboekjes: Huishoudboekje[] = [];
  nonArchivedHuishoudboekjes: Huishoudboekje[] = [];
  constructor(private huishoudboekjeService: HuishoudboekjeService){
    huishoudboekjeService.getHuishoudboekjes().subscribe(huishoudboekjes => {
      this.archivedHuishoudboekjes = huishoudboekjes.filter((huishoudboekje: {archived: any;}) => huishoudboekje.archived)
      this.nonArchivedHuishoudboekjes = huishoudboekjes.filter((huishoudboekje: {archived: any;}) => !huishoudboekje.archived)
    })


  }
}