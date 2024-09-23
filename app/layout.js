import { cn } from "@/lib/utils";
import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google font (Inter)
const inter = Inter({
  subsets: ["latin"], // Define the subsets you want (e.g., latin)
});

// Google font (Poppins) with specified weights
const poppins = Poppins({
  subsets: ["latin"], // Define subsets
  variable: "--font-poppins", // Define CSS variable for the font
  weight: ["400", "500", "600", "700"], // Specify the available weights (adjust based on your needs)
});

export const metadata = {
  title: "EduContent - World's Best Learning Platform",
  description: "Explore || Learn || Build || Share",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.className)}>
        {children}
        <Toaster richColors position="top-center"/>
      </body>
    </html>
  );
}
