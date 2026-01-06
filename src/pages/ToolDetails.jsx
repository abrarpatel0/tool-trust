import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToolById, createRental } from "../services/firestore";
import { useAuth } from "../context/AuthContext";
import { User, ArrowLeft, Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function ToolDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [renting, setRenting] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function fetchTool() {
      try {
        const toolData = await getToolById(id);
        if (!toolData) {
          toast.error("Tool not found");
          navigate("/tools");
          return;
        }
        setTool(toolData);
      } catch (error) {
        console.error("Error fetching tool:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTool();
  }, [id, navigate]);

  async function handleRent(e) {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please sign in to rent this tool");
      navigate("/login");
      return;
    }

    if (tool.ownerId === currentUser.uid) {
      toast.error("You cannot rent your own tool");
      return;
    }

    try {
      setRenting(true);

      const rentalData = {
        toolId: tool.id,
        toolName: tool.toolName,
        renterId: currentUser.uid,
        ownerId: tool.ownerId,
        startDate,
        endDate,
        pricePerDay: tool.pricePerDay,
        totalPrice: calculateTotal(startDate, endDate, tool.pricePerDay),
      };

      await createRental(rentalData);

      toast.success("Rental request sent successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to process rental request");
    } finally {
      setRenting(false);
    }
  }

  function calculateTotal(start, end, price) {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return (diffDays * price).toFixed(2);
  }

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );

  if (!tool) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-500 hover:text-slate-800 mb-6 font-medium"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden shadow-sm border">
            <img
              src={
                tool.imageUrls?.[0] ||
                "https://placehold.co/600x400?text=No+Image"
              }
              alt={tool.toolName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {tool.imageUrls?.slice(1).map((url, i) => (
              <div
                key={i}
                className="aspect-square bg-slate-100 rounded-lg overflow-hidden border"
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between mb-4">
            <div>
              <span className="text-blue-600 font-bold text-sm uppercase">
                {tool.category}
              </span>
              <h1 className="text-3xl font-bold mt-1">{tool.toolName}</h1>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                ${tool.pricePerDay}
              </div>
              <div className="text-sm text-slate-500">per day</div>
            </div>
          </div>

          <div className="flex items-center mb-6 bg-slate-50 p-3 rounded-lg">
            <User className="mr-3 text-slate-400" />
            <div>
              <p className="text-xs uppercase text-slate-500 font-bold">
                Owner
              </p>
              <p>{tool.ownerName || "Tool Trust User"}</p>
            </div>
          </div>

          <p className="text-slate-600 mb-6 whitespace-pre-wrap">
            {tool.description}
          </p>

          {currentUser ? (
            <form onSubmit={handleRent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border p-2 rounded"
                />
              </div>

              <button
                disabled={renting}
                className="w-full bg-blue-600 text-white py-3 rounded"
              >
                {renting ? "Processing..." : "Request to Rent"}
              </button>
            </form>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full border py-3 rounded"
            >
              Log in to rent
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
