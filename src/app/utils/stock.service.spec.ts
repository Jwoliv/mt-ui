import {TestBed} from '@angular/core/testing';
import {StockService} from './stock.service';
import {SummaryResponse} from '../model/api-model/summary.model';
import {Colors} from "../shared/app.colors";

describe('StockService', () => {
  let service: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDashboardStockHeight', () => {
    it('should return the correct height in pixels', () => {
      const total = 100;
      const value = 50;
      const result = service.getDashboardStockHeight(total, value);
      expect(result).toBe('110px');
    });

    it('should handle zero total', () => {
      const total = 0;
      const value = 50;
      const result = service.getDashboardStockHeight(total, value);
      expect(result).toBe('0px');
    });
  });

  describe('getSummaryStockHeight', () => {
    it('should return the correct height in pixels', () => {
      const dailyAmount = 100;
      const summaryData: SummaryResponse = {
        dailyReports: [
          { index: 1, amount: 50, color: Colors.LIGHT_RED, date: new Date() },
          { index: 1, amount: 50, color: Colors.LIGHT_RED, date: new Date() },
          { index: 1, amount: 50, color: Colors.LIGHT_RED, date: new Date() },
        ],
        profitReports: [
          { profit: 1, percentage: 50, isProfit: true, period: "WEEK" },
          { profit: 1, percentage: 50, isProfit: true, period: "WEEK" },
          { profit: 1, percentage: 50, isProfit: true, period: "WEEK" },
          { profit: 1, percentage: 50, isProfit: true, period: "WEEK" },
        ]
      };
      const result = service.getSummaryStockHeight(dailyAmount, summaryData);
      expect(result).toBe('960px');
    });

    it('should return 1px when calculated value is less than 1', () => {
      const dailyAmount = 0.01;
      const summaryData: SummaryResponse = {
        dailyReports: [
          { index: 1, amount: 50, color: Colors.LIGHT_RED, date: new Date() }
        ],
        profitReports: [
          { profit: 1, percentage: 50, isProfit: true, period: "WEEK" }
        ]
      };
      const result = service.getSummaryStockHeight(dailyAmount, summaryData);
      expect(result).toBe('1px');
    });
  });

  describe('maxDailyAmount', () => {
    it('should return the maximum amount from summaryData', () => {
      const summaryData: SummaryResponse = {
        dailyReports: [
          { index: 1, amount: 50, color: Colors.LIGHT_RED, date: new Date() }
        ],
        profitReports: [
          { profit: 1, percentage: 100, isProfit: true, period: "WEEK" }
        ]
      };
      const result = service['maxDailyAmount'](summaryData);
      expect(result).toBe(50);
    });

    it('should handle empty dailyReports', () => {
      const summaryData: SummaryResponse = {
        dailyReports: [],
        profitReports: []
      };
      const result = service['maxDailyAmount'](summaryData);
      expect(result).toBe(-Infinity); // or another value that you consider appropriate for empty data
    });
  });
});
