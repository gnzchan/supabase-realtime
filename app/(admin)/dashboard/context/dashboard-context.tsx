"use client";

import { Product, Quote } from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface DashboardContextType {
  products: Product[] | null;
  quotes:
    | (Quote & {
        quote_items: any[];
      })[]
    | null;
  setQuotes: Dispatch<
    SetStateAction<
      | ({
          created_at: string;
          id: string;
          recipient_email: string;
          recipient_name: string;
          responded_at: string | null;
          sent_at: string | null;
          status: string;
        } & {
          quote_items: any[];
        })[]
      | null
    >
  >;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({
  children,
  products,
  quotes: initialQuotes,
}: {
  children: ReactNode;
  products: Product[] | null;
  quotes:
    | (Quote & {
        quote_items: any[];
      })[]
    | null;
}) {
  const [quotes, setQuotes] = useState(initialQuotes);
  return (
    <DashboardContext.Provider value={{ products, quotes, setQuotes }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
