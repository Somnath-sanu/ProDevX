"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { memo, useState } from "react";

interface MonthYearFilterProps {
  onFilterChange: (startDate: Date | null, endDate: Date | null) => void;
}

function MonthYearFilter({ onFilterChange }: MonthYearFilterProps) {
  const [selectedValue, setSelectedValue] = useState<string>("all");

  const generateMonthYearOptions = () => {
    const options = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    options.push({
      value: "all",
      label: "All Time",
      startDate: null,
      endDate: null,
    });

    for (let year = currentYear - 1; year <= currentYear; year++) {
      for (let month = 0; month < 12; month++) {
        if (year === currentYear && month > currentDate.getMonth()) {
          break;
        }

        const date = new Date(year, month);
        options.push({
          value: `${year}-${month}`,
          label: date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          startDate: new Date(year, month, 1),
          endDate: new Date(year, month + 1, 0),
        });
      }
    }

    return options.reverse();
  };

  const monthYearOptions = generateMonthYearOptions();

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const option = monthYearOptions.find((opt) => opt.value === value);
    if (option) {
      onFilterChange(option.startDate, option.endDate);
    }
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[200px]">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          <SelectValue>
            {monthYearOptions.find((opt) => opt.value === selectedValue)?.label}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {monthYearOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default memo(MonthYearFilter);
