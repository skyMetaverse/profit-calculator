'use client';

import { cn } from '@/lib/utils';
import { ChangeEvent } from 'react';

interface InputProps {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    step?: string;
}

export function Input({ label, value, onChange, placeholder, className, step = "0.01" }: InputProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground/80">
                {label}
            </label>
            <input
                type="number"
                value={value}
                onChange={onChange}
                onWheel={(e) => e.currentTarget.blur()}
                step={step}
                min="0"
                placeholder={placeholder}
                className={cn(
                    "input-style",
                    className
                )}
            />
        </div>
    );
} 