'use client';

import { useState, ChangeEvent } from 'react';
import { Input } from './input';
import { ResultCard } from './result-card';
import { calculateAnnualRate, calculateDailyInterest, formatNumber } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';
import { LanguageToggle } from './language-toggle';

export function ProfitCalculator() {
    const [language, setLanguage] = useState<Language>('zh');
    const t = translations[language];

    // 本金计算相关状态
    const [principalAmount, setPrincipalAmount] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [calculatedDailyInterest, setCalculatedDailyInterest] = useState(0);
    const [calculatedPrincipalDailyRate, setCalculatedPrincipalDailyRate] = useState(0);
    const [calculatedPrincipalAnnualProfit, setCalculatedPrincipalAnnualProfit] = useState(0);

    // 收益计算相关状态
    const [profitPrincipal, setProfitPrincipal] = useState('');
    const [dailyProfit, setDailyProfit] = useState('');
    const [calculatedAnnualRate, setCalculatedAnnualRate] = useState(0);
    const [calculatedProfitDailyRate, setCalculatedProfitDailyRate] = useState(0);
    const [calculatedProfitAnnualProfit, setCalculatedProfitAnnualProfit] = useState(0);

    // 本金计算相关函数
    const calculatePrincipalResults = (principal: string, rate: string) => {
        if (principal && rate) {
            const principalNum = Number(principal);
            const annualRateDecimal = Number(rate) / 100;

            if (principalNum > 0 && annualRateDecimal > 0) {
                const dailyInt = calculateDailyInterest(principalNum, annualRateDecimal);
                const dailyRate = annualRateDecimal / 365 * 100;
                const annualProfit = dailyInt * 365;

                setCalculatedDailyInterest(dailyInt);
                setCalculatedPrincipalDailyRate(dailyRate);
                setCalculatedPrincipalAnnualProfit(annualProfit);
            } else {
                setCalculatedDailyInterest(0);
                setCalculatedPrincipalDailyRate(0);
                setCalculatedPrincipalAnnualProfit(0);
            }
        } else {
            setCalculatedDailyInterest(0);
            setCalculatedPrincipalDailyRate(0);
            setCalculatedPrincipalAnnualProfit(0);
        }
    };

    // 收益计算相关函数
    const calculateProfitResults = (principal: string, profit: string) => {
        if (principal && profit) {
            const principalNum = Number(principal);
            const dailyProfitNum = Number(profit);

            if (principalNum > 0 && dailyProfitNum > 0) {
                const annualRate = calculateAnnualRate(dailyProfitNum, principalNum) * 100;
                const dailyRate = annualRate / 365;
                const annualProfit = dailyProfitNum * 365;

                setCalculatedAnnualRate(annualRate);
                setCalculatedProfitDailyRate(dailyRate);
                setCalculatedProfitAnnualProfit(annualProfit);
            } else {
                setCalculatedAnnualRate(0);
                setCalculatedProfitDailyRate(0);
                setCalculatedProfitAnnualProfit(0);
            }
        } else {
            setCalculatedAnnualRate(0);
            setCalculatedProfitDailyRate(0);
            setCalculatedProfitAnnualProfit(0);
        }
    };

    // 处理函数
    const handlePrincipalAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrincipal = e.target.value;
        setPrincipalAmount(newPrincipal);
        calculatePrincipalResults(newPrincipal, annualRate);
    };

    const handleAnnualRateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newRate = e.target.value;
        setAnnualRate(newRate);
        calculatePrincipalResults(principalAmount, newRate);
    };

    const handleProfitPrincipalChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrincipal = e.target.value;
        setProfitPrincipal(newPrincipal);
        calculateProfitResults(newPrincipal, dailyProfit);
    };

    const handleDailyProfitChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newProfit = e.target.value;
        setDailyProfit(newProfit);
        calculateProfitResults(profitPrincipal, newProfit);
    };

    return (
        <div className="min-h-screen w-full flex flex-col justify-center pt-[15vh]">
            <LanguageToggle
                language={language}
                onChange={setLanguage}
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl mx-auto px-4 py-8 flex-1"
            >
                {/* 标题部分 */}
                <div className="flex items-center justify-center gap-1.5 mb-10">
                    <Calculator className="w-8 h-8 text-blue-500" />
                    <h1 className="text-3xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {t.title}
                    </h1>
                </div>

                {/* 主要内容 */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* 本金计算部分 */}
                    <div className="card-style space-y-4">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-medium text-blue-500">
                                {t.principalCalculation}
                            </h2>
                            <Input
                                label={t.principal}
                                value={principalAmount}
                                onChange={handlePrincipalAmountChange}
                                placeholder={t.principalPlaceholder}
                                step="1"
                            />
                            <Input
                                label={t.annualRate}
                                value={annualRate}
                                onChange={handleAnnualRateChange}
                                placeholder={t.annualRatePlaceholder}
                                step="0.01"
                            />
                        </div>

                        {principalAmount && annualRate && (
                            <motion.div
                                className="space-y-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <ResultCard
                                    title={t.results.dailyProfit}
                                    value={`$ ${formatNumber(calculatedDailyInterest)}`}
                                />
                                <ResultCard
                                    title={t.results.dailyRate}
                                    value={`${formatNumber(calculatedPrincipalDailyRate)}%`}
                                />
                                <ResultCard
                                    title={t.results.annualProfit}
                                    value={`$ ${formatNumber(calculatedPrincipalAnnualProfit)}`}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* 收益计算部分 */}
                    <div className="card-style space-y-4">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-medium text-purple-500">
                                {t.profitCalculation}
                            </h2>
                            <Input
                                label={t.principal}
                                value={profitPrincipal}
                                onChange={handleProfitPrincipalChange}
                                placeholder={t.principalPlaceholder}
                                step="1"
                            />
                            <Input
                                label={t.dailyProfit}
                                value={dailyProfit}
                                onChange={handleDailyProfitChange}
                                placeholder={t.dailyProfitPlaceholder}
                                step="0.01"
                            />
                        </div>

                        {profitPrincipal && dailyProfit && (
                            <motion.div
                                className="space-y-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <ResultCard
                                    title={t.results.annualRate}
                                    value={`${formatNumber(calculatedAnnualRate)}%`}
                                />
                                <ResultCard
                                    title={t.results.dailyRate}
                                    value={`${formatNumber(calculatedProfitDailyRate)}%`}
                                />
                                <ResultCard
                                    title={t.results.annualProfit}
                                    value={`$ ${formatNumber(calculatedProfitAnnualProfit)}`}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* 添加页脚 */}
            <footer className="w-full py-6 px-4 text-center text-sm text-foreground/60">
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3">
                        <a
                            href="https://github.com/skyMetaverse/profit-calculator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <span>•</span>
                        <span>
                            Powered by{' '}
                            <a
                                href="https://nextjs.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors"
                            >
                                Next.js
                            </a>
                            {', '}
                            <a
                                href="https://tailwindcss.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors"
                            >
                                Tailwind CSS
                            </a>
                            {' & '}
                            <a
                                href="https://cursor.sh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors"
                            >
                                Cursor
                            </a>
                        </span>
                    </div>
                    <div>
                        © {new Date().getFullYear()} Profit Calculator. MIT License.
                    </div>
                </div>
            </footer>
        </div>
    );
} 