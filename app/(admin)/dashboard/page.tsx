/*
- create quote
- display products
- display quotes
*/

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <>
      <Tabs defaultValue="quotes">
        <TabsList>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="quotes">quotes</TabsContent>
        <TabsContent value="products">products</TabsContent>
      </Tabs>
    </>
  );
}
