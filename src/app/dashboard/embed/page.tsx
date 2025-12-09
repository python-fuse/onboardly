import Sidebar from "@/src/components/dashboard/Sidebar";

export default function EmbedScript() {
  const scriptCode = `<script async src="https://cdn.guidely.io/widget.js" data-guidely-id="YOUR_UNIQUE_ID"></script>`;

  return (
    <div className="flex h-screen overflow-hidden text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Thin Vertical Line */}
      <div className="w-px bg-white" />
      {/* Main Content */}
      <div className="flex-1 p-16 overflow-hidden">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">Embed Script</h1>

        {/* Description */}
        <p className="text-gray-300 max-w-2xl mb-10">
          Copy the script below and paste it before the closing{" "}
          <span className="text-gray-100 font-semibold">&lt;/head&gt;</span> tag
          in your application&apos;s HTML to enable Guidely.
        </p>

        {/* How to Install Header */}
        <h2 className="text-xl font-semibold mb-4">How to install</h2>

        {/* Steps */}
        <ol className="list-decimal ml-6 text-gray-300 mb-8 space-y-2">
          <li>Copy the script below.</li>
          <li>
            Paste it just before the closing{" "}
            <span className="text-gray-100 font-semibold">&lt;/head&gt;</span>{" "}
            tag in your application&apos;s HTML.
          </li>
        </ol>

        {/* Script Input Box */}
        <div className="bg-gray-900/40 border border-gray-800 px-6 py-4 rounded-xl flex items-center justify-between max-w-4xl">
          <code className="text-gray-300 text-sm overflow-x-auto">
            {scriptCode}
          </code>

          {/* Copy Button */}
          <button className="ml-6 whitespace-nowrap px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium">
            Copy Script
          </button>
        </div>
      </div>
    </div>
  );
}
