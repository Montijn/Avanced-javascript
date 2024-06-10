import { Routes } from '@angular/router';
import { HuishoudboekjeOverviewPageComponent } from './pages/huishoudboekje-overview-page/huishoudboekje-overview-page.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { HuishoudboekjeEditPageComponent } from './pages/huishoudboekje-edit-page/huishoudboekje-edit-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: HuishoudboekjeOverviewPageComponent },
    { path: 'huishoudboekje/:id', component: HuishoudboekjeEditPageComponent },
    { path: 'auth', component: AuthenticationPageComponent}
];
