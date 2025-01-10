"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/database.types";
import { useDashboard } from "../../context/dashboard-context";

type Quote = Database["public"]["Tables"]["quotes"]["Row"] & {
  quote_items: (Database["public"]["Tables"]["quote_items"]["Row"] & {
    product: {
      name: string;
      price: number;
    };
  })[];
};

export function QuotesTable() {
  const { quotes } = useDashboard();

  if (!quotes) return null;
  function calculateTotal(quote: Quote) {
    return quote.quote_items
      .reduce((sum, item) => {
        return sum + (item.quantity ?? 0) * item.product.price;
      }, 0)
      .toFixed(2);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.map((quote) => (
          <TableRow key={quote.id}>
            <TableCell>{quote.recipient_name}</TableCell>
            <TableCell>{quote.recipient_email}</TableCell>
            <TableCell>
              <ul className="space-y-1">
                {quote.quote_items.map((item) => (
                  <li key={item.id}>
                    {item.quantity}x {item.product.name} (${item.product.price})
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>${calculateTotal(quote)}</TableCell>
            <TableCell>{quote.status}</TableCell>
            <TableCell>
              {new Date(quote.created_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
