"use client";

import { Product, Quote } from "@/types";
import { createContext, ReactNode, useContext } from "react";

interface DashboardContextType {
  products: Product[] | null;
  quotes:
    | (Quote & {
        quote_items: any[];
      })[]
    | null;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({
  children,
  products,
  quotes,
}: {
  children: ReactNode;
  products: Product[] | null;
  quotes:
    | (Quote & {
        quote_items: any[];
      })[]
    | null;
}) {
  return (
    <DashboardContext.Provider value={{ products, quotes }}>
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
