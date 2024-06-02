import { Component, Input } from '@angular/core';
import { HuishoudboekjeService } from '../../../services/huishoudboekje/huishoudboekje.service';
import { Huishoudboekje } from '../../../models/huishoudboekje.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-huishoudboekje',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf, NgClass],
  templateUrl: './list-huishoudboekje.component.html',
  styleUrl: './list-huishoudboekje.component.scss'
})
export class ListHuishoudboekjeComponent {

  @Input()
  huishoudboekjes: Huishoudboekje[] = [];

  constructor(private huishoudboekjeService: HuishoudboekjeService){
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
