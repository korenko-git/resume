import { useMemo } from "react";
import { Input } from "@/components/ui/input";

interface DateHeaderProps {
  className: string;
  data: {
    startDate?: string;
    endDate?: string;
    date?: string;
  };
  isEditing?: boolean;
  onDataChange: (data: Partial<DateHeaderProps["data"]>) => void;
}

export function DateHeader({
  className,
  data,
  isEditing = false,
  onDataChange,
}: DateHeaderProps) {
  const [from, to] = useMemo(() => {
    let from: string = "",
      to: string = "";
    const start = new Date(data.startDate || data.date || "");
    if (!data.endDate && !data.date) {
      from = String(start.getFullYear());
      to = "Present";
    } else {
      const end = new Date(data.endDate || data.date || "");

      if (start.getFullYear() === end.getFullYear()) {
        if (start.getMonth() === end.getMonth())
          from = `${start.toLocaleString("default", {
            month: "short",
          })} ${start.getFullYear()}`;
        else {
          from = start.toLocaleString("default", { month: "short" });
          to = `${end.toLocaleString("default", {
            month: "short",
          })} ${end.getFullYear()}`;
        }
      } else {
        from = `${start.getFullYear()}`;
        to = `${end.getFullYear()}`;
      }
    }

    return [from, to];
  }, [data]);

  if (isEditing) {
    return (
      <div className={`${className} flex gap-2 flex-col items-center`}>
        {data.hasOwnProperty("startDate") ? (
          <>
            <Input
              type="month"
              value={data.startDate || ""}
              onChange={(e) => onDataChange({ startDate: e.target.value })}
              placeholder="Start date"
              aria-label="Start date"
            />
            <span>-</span>
            <Input
              type="month"
              value={data.endDate || ""}
              onChange={(e) => onDataChange({ endDate: e.target.value })}
              placeholder="End date (or leave blank)"
              aria-label="End date"
            />
          </>
        ) : (
          <Input
            type="month"
            value={data.date || ""}
            onChange={(e) => onDataChange({ date: e.target.value })}
            aria-label="Date"
          />
        )}
      </div>
    );
  }

  return (
    <header className={className} aria-label={to ? `${from} to ${to}` : from}>
      {to ? `${from} - ${to}` : from}
    </header>
  );
}
