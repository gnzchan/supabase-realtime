"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { QuoteFormData } from "../components/quotes/new-quote-form";

export async function createQuote(formData: QuoteFormData) {
  try {
    const supabase = await createClient();

    // First, create the quote
    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .insert({
        recipient_email: formData.email,
        recipient_name: formData.name,
        status: "Pending",
      })
      .select()
      .single();

    if (quoteError) throw quoteError;

    // Then, create quote items for each product in the quote
    const quoteItems = formData.items.map((item) => ({
      quote_id: quote.id,
      product_id: item.productId,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("quote_items")
      .insert(quoteItems);

    if (itemsError) throw itemsError;

    // Revalidate the dashboard page to show the new quote
    revalidatePath("/dashboard");

    return { success: true, data: quote };
  } catch (error) {
    console.error("Error creating quote:", error);
    return { success: false, error: "Failed to create quote" };
  }
}
