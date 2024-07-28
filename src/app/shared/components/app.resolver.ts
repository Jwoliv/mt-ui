import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {NavigationConfig} from "../../model/component-model/navigation.model";
import {HttpConfigService} from "../../utils/http-config.service";
import {inject} from "@angular/core";
import {AccountService} from "../../services/api/entities/account.service";
import {of, switchMap} from "rxjs";

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

export {
  resolveTitleSelectedTransaction,
  resolveNavigationConfig,
  resolveTitleSelectedAccount
}
