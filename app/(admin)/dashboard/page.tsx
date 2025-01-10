import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { ProductsTable } from "./components/products/products-table";
import { QuotesSection } from "./components/quotes/quotes-section";
import { DashboardProvider } from "./context/dashboard-context";

export const metadata = {
  title: "Admin Dashboard | GnzChan Quotation Builder",
  description:
    "Manage quotes, track responses, and send professional quotations to clients in real-time",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const [productsResponse, quotesResponse] = await Promise.all([
    supabase.from("products").select(),
    supabase
      .from("quotes")
      .select(
        `
        *,
        quote_items (
          *,
          product: products (
            name,
            price
          )
        )
      `,
      )
      .order("created_at", { ascending: false }),
  ]);

  const { data: products } = productsResponse;
  const { data: quotes } = quotesResponse;

  return (
    <DashboardProvider products={products} quotes={quotes}>
      <Tabs defaultValue="quotes">
        <TabsList>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="quotes">
          <QuotesSection />
        </TabsContent>
        <TabsContent value="products">
          <ProductsTable />
        </TabsContent>
      </Tabs>
    </DashboardProvider>
  );
}
