import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {NavigationConfig} from "../../model/navigation.model";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from "../../services/config/properties.config";

export const resolveNavigationConfig: ResolveFn<NavigationConfig> = (activateRoute: ActivatedRouteSnapshot) => {
  const pageNumber = +(activateRoute.queryParamMap.get("pageNumber") ?? DEFAULT_PAGE_NUMBER);
  const pageSize = +(activateRoute.queryParamMap.get("pageSize") ?? DEFAULT_PAGE_SIZE);
  return {
    pageNumber, pageSize
  }
}
