"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function acceptQuote(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = await createClient();
  await supabase
    .from("quotes")
    .update({
      status: "Accepted",
      responded_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath(`/quotes/${id}`);
}

export async function rejectQuote(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = await createClient();
  await supabase
    .from("quotes")
    .update({
      status: "Denied",
      responded_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath(`/quotes/${id}`);
}
