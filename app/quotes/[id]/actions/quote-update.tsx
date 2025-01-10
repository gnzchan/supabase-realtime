import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const acceptQuote = async (id: string) => {
  "use server";
  const supabase = await createClient();
  await supabase
    .from("quotes")
    .update({
      status: "Accepted",
      responded_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath(`/quotes/${id}`);
};

export const rejectQuote = async (id: string) => {
  "use server";
  const supabase = await createClient();
  await supabase
    .from("quotes")
    .update({
      status: "Rejected",
      responded_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath(`/quotes/${id}`);
};
