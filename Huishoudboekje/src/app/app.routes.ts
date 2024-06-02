import { Routes } from '@angular/router';
import { DetailHuishoudboekjeComponent } from './components/huishoudboekje/detail-huishoudboekje/detail-huishoudboekje.component';
import { HuishoudboekjeOverviewPageComponent } from './pages/huishoudboekje-overview-page/huishoudboekje-overview-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: HuishoudboekjeOverviewPageComponent },
    { path: 'huishoudboekje/:id', component: DetailHuishoudboekjeComponent }
    { path: 'auth', component: AuthenticationPageComponent}
];
