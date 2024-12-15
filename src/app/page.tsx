import { ProfitCalculator } from '@/components/profit-calculator';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <ProfitCalculator />
    </div>
  );
}
