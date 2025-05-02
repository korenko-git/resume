import { useMemo } from "react";

interface DateHeaderProps {
  className: string;
  data: {
    startDate?: string;
    endDate?: string;
    date?: string;
  };
}

export function DateHeader({ className, data }: DateHeaderProps) {
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

  return (
    <header className={className} aria-label={to ? `${from} to ${to}` : from}>
      {to ? `${from} - ${to}` : from}
    </header>
  );
}
