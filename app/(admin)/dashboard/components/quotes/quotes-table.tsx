"use client";

import { Quote } from "@/app/quotes/[id]/page";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createBrowserClient } from "@/lib/supabase/browser";
import { calculateTotal } from "@/lib/utils";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDashboard } from "../../context/dashboard-context";

export function QuotesTable() {
  const supabase = createBrowserClient();
  const { quotes, setQuotes } = useDashboard();
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel("quotes")
      .on(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        { event: "UPDATE", schema: "public", table: "quotes" },
        (payload: any) => {
          setQuotes(
            (currentQuotes) =>
              currentQuotes?.map((quote) =>
                quote.id === payload.new.id
                  ? { ...quote, ...payload.new }
                  : quote,
              ) ?? [],
          );
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe;
    };
  }, [supabase]);

  if (!quotes) return null;

  const handleSendEmail = async (quote: Quote) => {
    setSendingEmail(quote.id);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: quote.recipient_name,
          customerEmail: quote.recipient_email,
          quoteNumber: quote.id,
          quoteLink: `${window.location.origin}/quotes/${quote.id}`, // Adjust this URL based on your actual quote viewing route
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setSendingEmail(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead>Date Email Sent</TableHead>
          <TableHead>Responded at</TableHead>
          <TableHead>Actions</TableHead>
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
            <TableCell>
              {quote.sent_at
                ? new Date(quote.sent_at).toLocaleDateString()
                : "N/A"}
            </TableCell>
            <TableCell>
              {quote.responded_at
                ? new Date(quote.responded_at).toLocaleDateString()
                : "N/A"}
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                disabled={sendingEmail === quote.id}
                onClick={() => handleSendEmail(quote)}
              >
                {sendingEmail === quote.id
                  ? "Sending..."
                  : quote.sent_at
                    ? "Resend Email"
                    : "Send Email"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
