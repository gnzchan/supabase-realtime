import QuoteConfirmation from "@/emails/quote-confirmation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["chrisgonzales.online@gmail.com"],
      subject: "Hello world",
      react: QuoteConfirmation({
        customerName: "J",
        quoteLink: "test link",
        quoteNumber: "2123",
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
