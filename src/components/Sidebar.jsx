import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        ToolTrust
      </h1>

      <nav className="space-y-3">
        <Link
          to="/dashboard"
          className="block px-3 py-2 rounded hover:bg-gray-800"
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="block px-3 py-2 rounded hover:bg-gray-800"
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}
