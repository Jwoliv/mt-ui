export interface SummaryData {
  dailyAmountReports: DailyAmountReport[]
  reports: ProfitReport[]
}

export interface DailyAmountReport {
  index: number,
  amount: number
  date: Date,
  color?: string
}

export interface ProfitReport {
  profit: number
  percentage: number
  isProfit: boolean
  period: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
}
