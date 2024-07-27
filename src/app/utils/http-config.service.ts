import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {
  private static BASE_URL: string = "http://localhost:9052";
  private static PREFIX_SERVICE: string = "/api/middle/";

  public static DEFAULT_PAGE_NUMBER: number = 0;
  public static DEFAULT_PAGE_SIZE: number = 5;

  public static AUTH_PATH: string = HttpConfigService.getPathToFamilyEndpoint('auth');
  public static CATEGORY_PATH: string = HttpConfigService.getPathToFamilyEndpoint('category');
  public static TRANSACTION_PATH: string = HttpConfigService.getPathToFamilyEndpoint('transaction');
  public static ACCOUNT_PATH: string = HttpConfigService.getPathToFamilyEndpoint('accounts');
  public static SUMMARY_PATH: string = HttpConfigService.getPathToFamilyEndpoint('summary');
  public static DASHBOARD_PATH: string = HttpConfigService.getPathToFamilyEndpoint('dashboard');


  private static getPathToFamilyEndpoint(suffix: string): string {
    return this.BASE_URL.concat(this.PREFIX_SERVICE).concat(suffix);
  }
}
