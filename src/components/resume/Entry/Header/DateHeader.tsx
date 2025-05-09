import { getDateRangeString } from "@/lib/dateUtils";
interface DateHeaderProps {
  className: string;
  startDate?: string;
  endDate?: string;
  date?: string;
}

export function DateHeader({
  className,
  startDate,
  endDate,
  date,
}: DateHeaderProps) {
  const dateString = getDateRangeString(startDate || date, endDate || date);

  return (
    <header className={className} aria-label={dateString.replace("-", "to")}>
      {dateString}
    </header>
  );
}
