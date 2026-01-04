import { useEffect } from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">
          IncidentIQ
        </h1>
      </header>

      {/* Main content */}
      <main className="p-6">
        <p className="text-gray-700">
          Start building here...
        </p>
      </main>
    </div>
  );
}

export default App;

