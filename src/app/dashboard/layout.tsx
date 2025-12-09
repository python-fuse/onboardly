import Sidebar from "../../components/dashboard/Sidebar";
import "../../app/globals.css";

export const metadata = {
  title: "Guidely",
  description: "Onboarding Tours",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-display bg-background-light dark:bg-background-dark">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
