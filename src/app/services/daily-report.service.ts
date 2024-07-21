import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtTokenService} from "./auth/jwt-token.service";
import {DailyReport} from "../model/report.model";

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  private httpClient: HttpClient = inject(HttpClient);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);


  public getDailyReports() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
    return this.httpClient.get<DailyReport[]>('http://localhost:9050/api/v1/reports/daily-dashboard', {
      headers
    })
  }
}
