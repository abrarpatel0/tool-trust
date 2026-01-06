import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addTool } from "../services/firestore";
import { uploadToolImage } from "../services/storage";
import { Upload, X, Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function AddTool() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    toolName: "",
    category: "",
    pricePerDay: "",
    description: "",
  });

  const categories = [
    "Power Tools",
    "Hand Tools",
    "Gardening",
    "Automotive",
    "Cleaning",
    "Ladders & Scaffolding",
    "Other",
  ];

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) =>
      [...prev, ...files.map((file) => URL.createObjectURL(file))]
    );
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!currentUser) return toast.error("Please log in first");
    if (images.length === 0)
      return toast.error("Please upload at least one image");

    try {
      setLoading(true);

      const imageUrls = await Promise.all(
        images.map((file) =>
          uploadToolImage(file, currentUser.uid, "temp")
        )
      );

      await addTool({
        ...formData,
        pricePerDay: parseFloat(formData.pricePerDay),
        ownerId: currentUser.uid,
        ownerName:
          currentUser.displayName ||
          currentUser.email.split("@")[0],
        imageUrls,
        availability: "available",
      });

      toast.success("Tool listed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to list tool");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 px-8 py-6 border-b">
        <h1 className="text-2xl font-bold">List a New Tool</h1>
        <p className="text-slate-600">
          Share your tools and earn extra cash.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <input
          required
          placeholder="Tool Name"
          className="w-full border p-2 rounded"
          value={formData.toolName}
          onChange={(e) =>
            setFormData({ ...formData, toolName: e.target.value })
          }
        />

        <select
          required
          className="w-full border p-2 rounded"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          required
          type="number"
          placeholder="Price per day"
          className="w-full border p-2 rounded"
          value={formData.pricePerDay}
          onChange={(e) =>
            setFormData({ ...formData, pricePerDay: e.target.value })
          }
        />

        <textarea
          required
          rows="4"
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <div className="grid grid-cols-4 gap-3">
          {previews.map((src, i) => (
            <div key={i} className="relative">
              <img src={src} alt="Tool preview" className="rounded" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-white p-1 rounded"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          <label className="border-dashed border flex items-center justify-center rounded cursor-pointer">
            <Upload />
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded flex items-center"
        >
          {loading && <Loader className="animate-spin mr-2" />}
          {loading ? "Listing..." : "List Tool"}
        </button>
      </form>
    </div>
  );
}
