import { ReactNode } from "react";

export const MainPage = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="h-20 bg-neutral-100 shadow-lg">
        <div className="container mx-auto flex h-full items-center justify-center">
          header
        </div>
      </header>
      <main className="container mx-auto min-h-[calc(100vh-10rem)] pt-5">
        {children}
      </main>
      <footer className="h-20 bg-neutral-200">
        <div className="container mx-auto flex h-full items-center justify-center">
          footer
        </div>
      </footer>
    </>
  );
};
