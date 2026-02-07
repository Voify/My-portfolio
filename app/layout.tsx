import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// 1. Import your Navbar
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; // Import here

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  weight: ["400", "600", "700", "800"], 
  subsets: ["latin"], 
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  title: "Mithun Minsara | Portfolio",
  description: "Creative Designer & Web Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer /> {/* Add here */}
      </body>
    </html>
  );
}