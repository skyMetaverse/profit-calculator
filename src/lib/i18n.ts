export const translations = {
    zh: {
        title: '利润计算器',
        principalCalculation: '本金计算',
        profitCalculation: '收益计算',
        principal: '本金 ($)',
        principalPlaceholder: '输入本金金额',
        annualRate: '年化率 (%)',
        annualRatePlaceholder: '输入年化收益率',
        dailyProfit: '日收益 ($)',
        dailyProfitPlaceholder: '输入每日收益',
        results: {
            dailyProfit: '每日收益',
            dailyRate: '日化利率',
            annualProfit: '年收益',
            annualRate: '年化收益率'
        }
    },
    en: {
        title: 'Profit Calculator',
        principalCalculation: 'Principal Calculation',
        profitCalculation: 'Profit Calculation',
        principal: 'Principal ($)',
        principalPlaceholder: 'Enter principal amount',
        annualRate: 'Annual Rate (%)',
        annualRatePlaceholder: 'Enter annual rate',
        dailyProfit: 'Daily Profit ($)',
        dailyProfitPlaceholder: 'Enter daily profit',
        results: {
            dailyProfit: 'Daily Profit',
            dailyRate: 'Daily Rate',
            annualProfit: 'Annual Profit',
            annualRate: 'Annual Rate'
        }
    }
} as const;

export type Language = keyof typeof translations; 