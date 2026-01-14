import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Kingsmen FC",
  description: "Official website of Kingsmen FC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ✅ Key: flex layout so footer stays at bottom, main fills space */}
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />

        {/* ✅ main grows to fill remaining height */}
        <main className="flex-1">{children}</main>

        <footer className="bg-black text-white text-center py-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Kingsmen FC. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
