export interface SummaryData {
    dailyAmountReports: DailyAmountReport[]
    reports: Report[]
}

export interface DailyAmountReport {
    index: number,
    amount: number
    date: Date,
    color?: string
}

export interface Report {
    amount: number
    percentage: number
    isProfit: boolean
    type: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
}
