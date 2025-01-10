import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/server";
import { calculateTotal } from "@/lib/utils";
import { notFound } from "next/navigation";
import { acceptQuote, rejectQuote } from "./actions/quote-update";

export type Quote = Database["public"]["Tables"]["quotes"]["Row"] & {
  quote_items: (Database["public"]["Tables"]["quote_items"]["Row"] & {
    products: {
      name: string;
      price: number;
    };
  })[];
};

export default async function QuotePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: quote } = await supabase
    .from("quotes")
    .select(`*, quote_items(*, products(name, price))`)
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
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {quote.quote_items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{item.products.name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">${item.products.price}</td>
                    <td className="px-4 py-2">
                      ${((item.quantity ?? 1) * item.products.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t bg-gray-50">
                  <td
                    colSpan={3}
                    className="px-4 py-2 text-right font-semibold"
                  >
                    Total:
                  </td>
                  <td className="px-4 py-2 font-semibold">
                    ${calculateTotal(quote)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Quote Status: {quote.status}
        </div>

        {quote.status === "Pending" && (
          <div className="mt-4 flex gap-4">
            <form action={() => acceptQuote(id)}>
              <button
                type="submit"
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Accept Quote
              </button>
            </form>
            <form action={() => rejectQuote(id)}>
              <button
                type="submit"
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Reject Quote
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
