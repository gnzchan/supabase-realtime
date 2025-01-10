import { NewQuoteDialog } from "./new-quote-dialog";
import { QuotesTable } from "./quotes-table";

export function QuotesSection() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Quotes</h2>
        <NewQuoteDialog />
      </div>
      <QuotesTable />
    </div>
  );
}
