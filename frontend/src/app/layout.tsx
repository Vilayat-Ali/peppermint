import type { Metadata } from "next";
import "./styles/globals.css";

// layout component
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Peppermint",
  description: "The coolest NFT marketplace on the planet!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
