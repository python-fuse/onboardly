import type { Metadata } from "next";
import "./globals.css";
import Header from "@/src/components/shared/header";
import Footer from "@/src/components/shared/footer";

export const metadata: Metadata = {
  title: "Guidely - Build Onboarding That Clicks",
  description:
    "Create beautiful, embeddable onboarding tours for your users in minutes with our powerful no-code platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
