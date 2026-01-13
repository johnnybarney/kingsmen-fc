import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "./components/Navbar";
import PageFade from "./components/PageFade";


export const metadata = {
  title: "Kingsmen FC",
  description: "Official website of Kingsmen FC",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />

      <main>
        <PageFade>{children}</PageFade>
      </main>

         <footer className="bg-black text-white text-center py-4 mt-10">
          <p className="text-sm">
            © {new Date().getFullYear()} Kingsmen FC. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
