import { Routes } from '@angular/router';
import { HuishoudboekjeOverviewPageComponent } from './pages/huishoudboekje-overview-page/huishoudboekje-overview-page.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';
import { HuishoudboekjeEditPageComponent } from './pages/huishoudboekje-edit-page/huishoudboekje-edit-page.component';
import { TransactionEditPageComponent } from './pages/transaction-edit-page/transaction-edit-page.component';
import { HuishoudboekjeDetailsPageComponent } from './pages/huishoudboekje-details-page/huishoudboekje-details-page.component';
import { TransactionOverviewPageComponent } from './pages/transaction-overview-page/transaction-overview-page.component';
import { CategoryOverviewPageComponent } from './pages/category-overview-page/category-overview-page.component';
import { CategoryEditPageComponent } from './pages/category-edit-page/category-edit-page.component';
import { authGuard } from './guards/auth-guard.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: HuishoudboekjeOverviewPageComponent },
    { path: 'huishoudboekje/edit/:id', component: HuishoudboekjeEditPageComponent, canActivate: [authGuard] },
    { path: 'huishoudboekje/:id/transaction/edit/:transactionId', component: TransactionEditPageComponent, canActivate: [authGuard] },
    { path: 'huishoudboekje/:id/category/edit/:categoryId', component: CategoryEditPageComponent, canActivate: [authGuard] },
    { path: 'huishoudboekje/:id', component: HuishoudboekjeDetailsPageComponent, canActivate: [authGuard] },
    { path: 'huishoudboekje/:id/transactions', component: TransactionOverviewPageComponent, canActivate: [authGuard] },
    { path: 'huishoudboekje/:id/categories', component: CategoryOverviewPageComponent, canActivate: [authGuard] },
    { path: 'auth', component: AuthenticationPageComponent }
];
