"use client";

import { BrowserQuote, Product } from "@/types";
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
  quotes: BrowserQuote[] | null;
  setQuotes: Dispatch<SetStateAction<BrowserQuote[] | null>>;
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
  quotes: BrowserQuote[] | null;
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
