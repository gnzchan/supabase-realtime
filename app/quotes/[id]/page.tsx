import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { calculateTotal, getStatusColor } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { acceptQuote, rejectQuote } from "./actions/quote-update";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Quote #${id} | GnzChan Quotation Builder`,
    description: "Review your quotation details and respond with your decision",
  };
}

export default async function QuotePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: quote } = await supabase
    .from("quotes")
    .select(`*, quote_items(*, product:products(name, price))`)
    .eq("id", id)
    .single();

  if (!quote) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Quote Details</h1>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Customer Information</h2>
          <p>Name: {quote.recipient_name}</p>
          <p>Email: {quote.recipient_email}</p>
          <p>Date: {new Date(quote.created_at).toLocaleDateString()}</p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Items</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quote.quote_items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.product.price}</TableCell>
                  <TableCell>
                    ${((item.quantity ?? 1) * item.product.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-semibold">
                  Total:
                </TableCell>
                <TableCell className="font-semibold">
                  ${calculateTotal(quote)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className={`text-sm ${getStatusColor(quote.status)}`}>
          Quote Status: {quote.status}
        </div>

        {quote.status === "Pending" && (
          <div className="mt-4 flex gap-4">
            <form action={acceptQuote}>
              <input type="hidden" name="id" value={id} />
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Accept Quote
              </Button>
            </form>
            <form action={rejectQuote}>
              <input type="hidden" name="id" value={id} />
              <Button type="submit" className="bg-red-500 hover:bg-red-600">
                Reject Quote
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
