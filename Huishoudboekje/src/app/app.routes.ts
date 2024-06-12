import { Routes } from '@angular/router';
import { HuishoudboekjeOverviewPageComponent } from './pages/huishoudboekje-overview-page/huishoudboekje-overview-page.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { HuishoudboekjeEditPageComponent } from './pages/huishoudboekje-edit-page/huishoudboekje-edit-page.component';
import { TransactionOverviewPageComponent } from './pages/transaction-overview-page/transaction-overview-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: HuishoudboekjeOverviewPageComponent },
    { path: 'huishoudboekje/edit/:id', component: HuishoudboekjeEditPageComponent },
    { path: 'huishoudboekje/:id', component: TransactionOverviewPageComponent },
    { path: 'auth', component: AuthenticationPageComponent}
];
