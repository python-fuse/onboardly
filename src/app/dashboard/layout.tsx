import type { Metadata } from "next";
import "../../app/globals.css";

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
          <div className=" flex h-full grow flex-col">
            <div className="">
              <div className="">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
