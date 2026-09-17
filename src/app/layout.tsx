import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppBot from "@/components/WhatsAppBot";

export const metadata: Metadata = {
  title: "Nature Waste Management Ltd | Garbage Pickup & Recycling Uganda",
  description:
    "Leading waste management, scheduled residential garbage pickup, commercial roll-off dumpsters, and circular recycling in Kampala, Entebbe Road, and Wakiso, Uganda.",
  keywords: [
    "Nature Waste",
    "Nature Waste Management Ltd",
    "Waste Connections Uganda",
    "Garbage pickup Kampala",
    "Dumpster rental Uganda",
    "Skip hire Kampala",
    "Recycling Uganda",
    "NEMA licensed waste handler",
    "Kitende waste collection",
    "GoGreenug",
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
        <meta name="theme-color" content="#006F51" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white antialiased text-[#363636] font-sans selection:bg-[#006F51] selection:text-white w-full max-w-full overflow-x-clip">
        <Header />
        <div className="flex-1 flex flex-col w-full max-w-full overflow-x-clip">{children}</div>
        <Footer />
        <WhatsAppBot />
      </body>
    </html>
  );
}
