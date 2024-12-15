import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
    return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}

export function calculateDailyInterest(principal: number, annualRate: number): number {
    return (principal * annualRate) / 365;
}

export function calculateAnnualRate(dailyProfit: number, principal: number): number {
    return (dailyProfit * 365) / principal;
} 