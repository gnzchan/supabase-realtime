import { BrowserQuote } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotal(quote: BrowserQuote) {
  return quote.quote_items
    .reduce((sum, item) => {
      return sum + (item.quantity ?? 0) * item.product.price;
    }, 0)
    .toFixed(2);
}

export function getStatusColor(status: string) {
  switch (status) {
    case "Accepted":
      return "text-green-500";
    case "Denied":
      return "text-red-500";
    case "Pending":
      return "text-yellow-500";
    default:
      return "";
  }
}
