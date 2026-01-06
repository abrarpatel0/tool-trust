import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserTools, getUserRentals } from "../services/firestore";
import ToolCard from "../components/ToolCard";
import { Loader, Package, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [tools, setTools] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        try {
          const [userTools, userRentals] = await Promise.all([
            getUserTools(currentUser.uid),
            getUserRentals(currentUser.uid),
          ]);
          setTools(userTools);
          setRentals(userRentals);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">
          Manage your listings and rentals.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab("listings")}
          className={`pb-3 px-1 font-medium text-sm ${
            activeTab === "listings"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          My Listings ({tools.length})
        </button>

        <button
          onClick={() => setActiveTab("rentals")}
          className={`pb-3 px-1 font-medium text-sm ${
            activeTab === "rentals"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          My Rentals ({rentals.length})
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {activeTab === "listings" && (
          <>
            {tools.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <Package className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-900">
                  No tools listed yet
                </h3>
                <p className="text-slate-500 mb-4">
                  Start earning by listing your tools.
                </p>
                <a
                  href="/add-tool"
                  className="text-blue-600 font-medium hover:underline"
                >
                  List your first tool
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "rentals" && (
          <>
            {rentals.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-900">
                  No active rentals
                </h3>
                <p className="text-slate-500 mb-4">
                  You haven't rented any tools yet.
                </p>
                <a
                  href="/tools"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Browse available tools
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Rental #{rental.id.slice(0, 8)}
                      </h4>
                      <p className="text-sm text-slate-500">
                        Status:{" "}
                        <span className="capitalize">{rental.status}</span>
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {rental.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
