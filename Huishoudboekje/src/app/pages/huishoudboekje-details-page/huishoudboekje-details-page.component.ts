import { Component } from '@angular/core';
import { DetailsHuishoudboekjeComponent } from "../../components/huishoudboekje/details-huishoudboekje/details-huishoudboekje.component";
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-huishoudboekje-details-page',
    standalone: true,
    templateUrl: './huishoudboekje-details-page.component.html',
    styleUrl: './huishoudboekje-details-page.component.scss',
    imports: [DetailsHuishoudboekjeComponent, NavbarComponent, RouterModule]
})
export class HuishoudboekjeDetailsPageComponent {
  huishoudboekjeId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
