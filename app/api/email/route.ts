import QuoteConfirmation from "@/emails/quote-confirmation";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { customerName, customerEmail, quoteNumber, quoteLink } =
      await request.json();

    if (!customerEmail || !customerName || !quoteNumber || !quoteLink) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "GnzChan <noreply@gonzaleschan.com>",
      to: [customerEmail],
      subject: `Quote ${quoteNumber} - Your Quotation Details`,
      react: QuoteConfirmation({
        customerName,
        quoteLink,
        quoteNumber,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // Update quote's sent_at in Supabase
    const supabase = await createClient();
    const { error: updateError } = await supabase
      .from("quotes")
      .update({ sent_at: new Date().toISOString() })
      .eq("id", quoteNumber);

    if (updateError) {
      return Response.json(
        { error: "Failed to update quote sent status" },
        { status: 500 },
      );
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
