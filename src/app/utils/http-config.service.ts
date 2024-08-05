import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {
  private static BASE_URL: string = "http://localhost:9052";
  private static BASE_CORE_URL: string = "http://localhost:9050";
  private static PREFIX_SERVICE: string = "/api/middle/";
  private static PREFIX_CORE_SERVICE: string = '/api/v1/';

  public static DEFAULT_PAGE_NUMBER: number = 0;

  public static DEFAULT_PAGE_SIZE: number = 5;
  public static AUTH_PATH: string = HttpConfigService.getPathToFamilyEndpoint('auth');
  public static CATEGORY_PATH: string = HttpConfigService.getPathToFamilyEndpoint('category');
  public static TRANSACTION_PATH: string = HttpConfigService.getPathToFamilyEndpoint('transaction');
  public static ACCOUNT_PATH: string = HttpConfigService.getPathToFamilyEndpoint('accounts');
  public static SUMMARY_PATH: string = HttpConfigService.getPathToFamilyEndpoint('summary');
  public static DASHBOARD_PATH: string = HttpConfigService.getPathToFamilyEndpointToCore('dashboard');
  public static DOWNLOAD_REPORTS_PATH: string = HttpConfigService.getPathToFamilyEndpointToCore('download-reports');


  private static getPathToFamilyEndpoint(suffix: string): string {
    return this.BASE_URL.concat(this.PREFIX_SERVICE).concat(suffix);
  }

  private static getPathToFamilyEndpointToCore(suffix: string) {
    return this.BASE_CORE_URL.concat(this.PREFIX_CORE_SERVICE).concat(suffix);
  }
}
