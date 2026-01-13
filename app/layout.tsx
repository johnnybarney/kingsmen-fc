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
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />

        <main>{children}</main>

        <footer className="bg-black text-white text-center py-4 mt-10">
          <p className="text-sm">
            © {new Date().getFullYear()} Kingsmen FC. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
