import Header from "./header";

export default function DocsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="pt-[61px]">{children}</div>
    </>
  );
}
