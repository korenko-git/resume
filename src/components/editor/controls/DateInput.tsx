"use client";

import { Input } from "@/components/common/ui/input";
import { formatDateForInput } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

interface DateInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export function DateInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
  disabled = false,
  required = false,
}: DateInputProps) {
  return (
    <div className="space-y-2">
      {label && <label htmlFor={id} className="text-sm font-medium">{label}</label>}
      <Input
        id={id}
        type="month"
        value={formatDateForInput(value)}
        onChange={(e) => {
          const newValue = e.target.value;
          onChange(newValue);
        }}
        className={cn(
          "w-full",
          className
        )}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    </div>
  );
}