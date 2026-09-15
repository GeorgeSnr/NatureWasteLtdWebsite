import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nature Waste Management Ltd | Nature Waste Connect",
  description:
    "Next-Gen Waste Management & Circular Economy ERP for Municipalities, Commercial Enterprises, and Sustainable Communities. Reduce. Reuse. Recycle.",
  keywords: [
    "Nature Waste",
    "Nature Waste Management Ltd",
    "Nature Waste Connect",
    "Smart Waste Collection",
    "Waste ERP Africa",
    "Circular Economy",
    "Recycling Uganda",
    "Recycling Kenya",
    "IoT Smart Bins",
  ],
  authors: [{ name: "Nature Waste Management Ltd" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0B6B1E" />
      </head>
      <body className="min-h-screen flex flex-col bg-white antialiased text-[#333333] font-sans selection:bg-nature-primary selection:text-white">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
