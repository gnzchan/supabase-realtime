import { Quote } from "@/app/quotes/[id]/page";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotal(quote: Quote) {
  return quote.quote_items
    .reduce((sum, item) => {
      return sum + (item.quantity ?? 0) * item.products.price;
    }, 0)
    .toFixed(2);
}
