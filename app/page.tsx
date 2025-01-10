import Link from "next/link";

export const metadata = {
  title: "GnzChan Quotation Builder",
  description:
    "Professional quotation management system - Create, send, and track quotes in real-time",
};

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-6xl font-bold text-transparent">
          Quotations Made Simple
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600">
          Transform your business quotations with our powerful builder. Create,
          customize, and manage professional quotes in minutes, not hours.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg border border-blue-600 bg-white px-8 py-4 font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
