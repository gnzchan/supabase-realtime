import { Database, Tables } from "./database.types";

export type Product = Tables<"products">;
export type Quote = Tables<"quotes">;
export type QuoteItem = Tables<"quote_items">;

export type BrowserQuote = Database["public"]["Tables"]["quotes"]["Row"] & {
  quote_items: (Database["public"]["Tables"]["quote_items"]["Row"] & {
    product: {
      name: string;
      price: number;
    };
  })[];
};
