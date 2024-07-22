import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {resolveNavigationConfig} from "./shared/components/app.resolver";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path: 'summary',
        title: 'Summary',
        loadComponent: () => import('./components/summary/summary.component').then(module => module.SummaryComponent)
    },
    {
        path: 'transactions',
        title: 'Transactions',
        resolve: {
          navigationConfig: resolveNavigationConfig
        },
        loadComponent: () => import('./components/transactions/transactions.component').then(module => module.TransactionsComponent)
    },
    {
        path: 'accounts',
        title: 'Accounts',
        resolve: {
          navigationConfig: resolveNavigationConfig
        },
        loadComponent: () => import('./components/accounts/accounts.component').then(module => module.AccountsComponent)
    },
    {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('./components/settings/settings.component').then(module => module.SettingsComponent)
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./components/auth/login/login.component').then(module => module.LoginComponent)
    },
    {
        path: 'sign-up',
        title: 'SignUp',
        loadComponent: () => import('./components/auth/sign-up/sign-up.component').then(module => module.SignUpComponent)
    }
];
