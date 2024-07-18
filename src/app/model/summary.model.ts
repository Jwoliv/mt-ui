export interface SummaryData {
    summaryDailyStocks: SummaryDailyStock[]
    reports: Report[]
}

export interface SummaryDailyStock {
    index: number,
    dailyAmount: number
    date: Date,
    color?: string
}

export interface Report {
    amount: number
    percentage: number
    isProfit: boolean
    type: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
}
