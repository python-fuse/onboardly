import "./globals.css";
import ConvexProviderWrapper from "@/src/components/dashboard/ConvexProviderWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProviderWrapper>
      <html lang="en" className="dark">
        <head>
          <title>Guidely - Build Onboarding That Clicks</title>
          <meta
            name="description"
            content="Create beautiful, embeddable onboarding tours for your users in minutes with our powerful no-code platform."
          />
        </head>
        <body>
          <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            {children}
          </div>
        </body>
      </html>
    </ConvexProviderWrapper>
  );
}
