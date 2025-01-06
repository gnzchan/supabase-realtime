/*
- create quote
- display products
- display quotes
*/

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { ProductsTable } from "./components/products-table";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();

  console.log(products);
  return (
    <>
      <Tabs defaultValue="quotes">
        <TabsList>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="quotes">quotes</TabsContent>
        <TabsContent value="products">
          {products && <ProductsTable products={products} />}
        </TabsContent>
      </Tabs>
    </>
  );
}
