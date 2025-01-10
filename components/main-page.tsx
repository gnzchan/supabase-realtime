import Link from "next/link";
import { ReactNode } from "react";

export const MainPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="h-20 bg-neutral-100 shadow-lg">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <h1 className="text-3xl font-medium">Quotation Builder</h1>
        </div>
      </header>
      <main className="container mx-auto min-h-[calc(100vh-10rem)] pt-5">
        {children}
      </main>
      <footer className="h-20 bg-neutral-200">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <div className="text-sm">
            © {new Date().getFullYear()} Christian Gonzales
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href="https://github.com/gnzchan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-500 hover:scale-110"
            >
              GitHub
            </Link>
            <Link
              href="https://www.gonzaleschan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-500 hover:scale-110"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
