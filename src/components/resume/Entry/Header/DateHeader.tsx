import { useMemo } from "react";
import { Input } from "@/components/common/ui/input";
import { EditableField } from "@/components/editor/fields/EditableField";

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

  return (
    <EditableField
      value={data}
      isEditing={isEditing}
      onChange={onDataChange}
      className={className}
      renderDisplay={(value) => (
        <header className={className} aria-label={to ? `${from} to ${to}` : from}>
          {to ? `${from} - ${to}` : from}
        </header>
      )}
      renderEdit={(value, onChange) => (
        <div className={`${className} flex gap-2 flex-col items-center`}>
          {value.hasOwnProperty("startDate") ? (
            <>
              <Input
                type="month"
                value={value.startDate || ""}
                onChange={(e) => onChange({ ...value, startDate: e.target.value })}
                placeholder="Start date"
                aria-label="Start date"
              />
              <span>-</span>
              <Input
                type="month"
                value={value.endDate || ""}
                onChange={(e) => onChange({ ...value, endDate: e.target.value })}
                placeholder="End date (or leave blank)"
                aria-label="End date"
              />
            </>
          ) : (
            <Input
              type="month"
              value={value.date || ""}
              onChange={(e) => onChange({ ...value, date: e.target.value })}
              aria-label="Date"
            />
          )}
        </div>
      )}
    />
  );
}
