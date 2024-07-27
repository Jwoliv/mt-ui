import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {NavigationConfig} from "../../model/component-model/navigation.model";
import {HttpConfigService} from "../../utils/http-config.service";

export const resolveNavigationConfig: ResolveFn<NavigationConfig> = (activateRoute: ActivatedRouteSnapshot) => {
  const pageNumber = +(activateRoute.queryParamMap.get("pageNumber") ?? HttpConfigService.DEFAULT_PAGE_NUMBER);
  const pageSize = +(activateRoute.queryParamMap.get("pageSize") ?? HttpConfigService.DEFAULT_PAGE_SIZE);
  return {
    pageNumber, pageSize
  }
}
