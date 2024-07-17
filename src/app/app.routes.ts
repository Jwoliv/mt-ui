import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'summary',
        loadComponent: () => import('./components/summary/summary.component').then(module => module.SummaryComponent)
    },
    {
        path: 'transactions',
        loadComponent: () => import('./components/transactions/transactions.component').then(module => module.TransactionsComponent)
    },
    {
        path: 'accounts',
        loadComponent: () => import('./components/accounts/accounts.component').then(module => module.AccountsComponent)
    },
    {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component').then(module => module.SettingsComponent)
    }
];
