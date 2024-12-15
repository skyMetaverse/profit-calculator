import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ResultCardProps {
    title: string;
    value: string;
    className?: string;
}

export function ResultCard({ title, value, className }: ResultCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "text-sm text-foreground/60",
                className
            )}
        >
            <div className="flex justify-between items-center">
                <span>{title}</span>
                <span className="font-medium text-foreground">{value}</span>
            </div>
        </motion.div>
    );
} 