import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DottedGlowBackground from "@/components/background/DottedGlowBackground";
import { CatalogSearchFocusProvider } from "@/components/catalog/CatalogSearchContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SiteInfoProvider } from "@/components/providers/SiteInfoProvider";
import { getSiteInfo } from "@/sanity/queries";
import { Toaster } from "sonner";
import CommandPalette from "@/components/CommandPalette";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Otis Library | Norwich, CT",
  description:
    "Information, Culture, & Community in Norwich, CT. Find hours, events, parking, and library resources at Otis Library.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const siteInfo = await getSiteInfo();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex font-sans bg-white text-slate-800">
        <ThemeProvider>
          <LanguageProvider>
            <SiteInfoProvider value={siteInfo}>
              <DottedGlowBackground />
              <CatalogSearchFocusProvider>
                <div className="flex min-h-full flex-1 flex-col">
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
                <CommandPalette />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      background: "#121a2e",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#e2e8f0",
                    },
                  }}
                />
              </CatalogSearchFocusProvider>
            </SiteInfoProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
