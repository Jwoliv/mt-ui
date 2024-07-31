import {ActivatedRouteSnapshot, ResolveFn, Router} from "@angular/router";
import {NavigationConfig} from "../../model/component-model/navigation.model";
import {HttpConfigService} from "../../utils/http-config.service";
import {inject} from "@angular/core";
import {AccountService} from "../../services/api/entities/account.service";
import {of, switchMap} from "rxjs";
import {JwtTokenService} from "../../utils/jwt-token.service";
import {CategoryService} from "../../services/api/entities/category.service";

const resolveNavigationConfig: ResolveFn<NavigationConfig> = (activateRoute: ActivatedRouteSnapshot) => {
  const pageNumber = +(activateRoute.queryParamMap.get("pageNumber") ?? HttpConfigService.DEFAULT_PAGE_NUMBER);
  const pageSize = +(activateRoute.queryParamMap.get("pageSize") ?? HttpConfigService.DEFAULT_PAGE_SIZE);
  return {
    pageNumber, pageSize
  }
}


const resolveTitleSelectedTransaction: ResolveFn<string> = (activateRoute: ActivatedRouteSnapshot) => {
  const id = activateRoute.paramMap.get('id');
  return `Transaction [${id}]`
}

const resolveTitleSelectedAccount: ResolveFn<string> = (activateRoute: ActivatedRouteSnapshot) => {
  const accountService = inject(AccountService);
  const id = +(activateRoute.paramMap.get('id') ?? -1);
  return id === -1
    ? of('Account')
    : accountService.getUserAccountById(id).pipe(switchMap(account => of(account.name)));
};

const resolveRedirectAuthPageToDashboard: ResolveFn<boolean> = (activateRoute: ActivatedRouteSnapshot) => {
  const router: Router = inject(Router);
  if (localStorage.getItem(JwtTokenService.TOKEN_NAME)) {
    router.navigate(['/dashboard']).then();
    return true;
  }
  return false;
}

const resolveTitleSelectedCategories: ResolveFn<string> = (activateRoute: ActivatedRouteSnapshot) => {
  const categoryService: CategoryService = inject(CategoryService);
  const id = +(activateRoute.paramMap.get('id') ?? -1);
  return id === -1
    ? of('Categories')
    : categoryService.getCategoryById(id).pipe(switchMap(category => of(category.name)));
}

export {
  resolveTitleSelectedTransaction,
  resolveNavigationConfig,
  resolveTitleSelectedAccount,
  resolveRedirectAuthPageToDashboard,
  resolveTitleSelectedCategories
}
