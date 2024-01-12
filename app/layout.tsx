import type { Metadata } from "next";
import "./globals.css";
import ProjectProviders from "@/shared/provider/ProjectProviders";
import { Outfit } from "next/font/google";
import HeaderComp from "@/components/layout/Header";

// const inter = Inter({ subsets: ['latin'] });

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Anova Marketplace",
  description: "A marketplace to sell and buy electricity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable}`}>
        <ProjectProviders>
          <HeaderComp />
          {children}
        </ProjectProviders>
      </body>
    </html>
  );
}
