import {Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {
  resolveNavigationConfig, resolveRedirectAuthPageToDashboard,
  resolveTitleSelectedAccount, resolveTitleSelectedCategories,
  resolveTitleSelectedTransaction
} from "./shared/components/app.resolver";

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
        path: 'transactions/:id',
        title: resolveTitleSelectedTransaction,
        loadComponent: () => import('./components/select-transaction/select-transaction.component').then(module => module.SelectTransactionComponent)
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
        path: 'accounts/:id',
        title: resolveTitleSelectedAccount,
        loadComponent: () => import('./components/select-account/select-account.component').then(module => module.SelectAccountComponent)
    },
    {
        path: 'categories',
        title: 'Categories',
        loadComponent: () => import('./components/categories/categories.component').then(module => module.CategoriesComponent)
    },
    {
        path: 'categories/:id',
        title: resolveTitleSelectedCategories,
        loadComponent: () => import('./components/selected-category/selected-category.component').then(module => module.SelectedCategoryComponent)
    },
    {
        path: 'login',
        title: 'Login',
        resolve: {
          isRedirect: resolveRedirectAuthPageToDashboard
        },
        loadComponent: () => import('./components/auth/login/login.component').then(module => module.LoginComponent)
    },
    {
        path: 'sign-up',
        title: 'Sign Up',
        resolve: {
          isRedirect: resolveRedirectAuthPageToDashboard
        },
        loadComponent: () => import('./components/auth/sign-up/sign-up.component').then(module => module.SignUpComponent)
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
    }
];
