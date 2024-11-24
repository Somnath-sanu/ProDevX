import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(from: Date): string {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
};
