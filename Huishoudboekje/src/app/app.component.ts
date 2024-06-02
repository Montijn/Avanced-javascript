import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateHuishoudboekjeComponent } from './components/huishoudboekje/create-huishoudboekje/create-huishoudboekje.component';
import { ListHuishoudboekjeComponent } from './components/huishoudboekje/list-huishoudboekje/list-huishoudboekje.component';
import { DetailHuishoudboekjeComponent } from './components/huishoudboekje/detail-huishoudboekje/detail-huishoudboekje.component';
import { HuishoudboekjeOverviewPageComponent } from './pages/huishoudboekje-overview-page/huishoudboekje-overview-page.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CreateHuishoudboekjeComponent,
    ListHuishoudboekjeComponent,
    DetailHuishoudboekjeComponent,
    HuishoudboekjeOverviewPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Huishoudboekje';
}
