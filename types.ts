import { Tables } from "./database.types";

export type Product = Tables<"products">;
export type Quote = Tables<"quotes">;
export type QuoteItem = Tables<"quote_items">;
