import {Colors} from "../shared/app.colors";

export interface SummaryResponse {
  dailyReports: DailyAmountReport[]
  profitReports: ProfitReport[]
}

export interface DailyAmountReport {
  index: number,
  amount: number
  date: Date,
  color?: Colors
}

export interface ProfitReport {
  profit: number
  percentage: number
  isProfit: boolean
  period: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
}
