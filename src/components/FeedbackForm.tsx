
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { Plus } from "lucide-react";

interface FeedbackFormProps {
  onSubmitted: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmitted }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!title.trim()) {
      setError("Title is required.");
      setLoading(false);
      return;
    }
    const { error } = await supabase
      .from("feedback")
      .insert([{ title, description }]);
    if (error) {
      setError(error.message);
    } else {
      setTitle("");
      setDescription("");
      onSubmitted();
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 mb-6 w-full max-w-lg mx-auto animate-fade-in"
    >
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-500" /> Submit Feedback
      </h2>
      <div className="mb-3">
        <input
          className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Title"
          value={title}
          maxLength={80}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Description (optional)"
          value={description}
          maxLength={300}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          rows={3}
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Add Feedback"}
      </button>
    </form>
  );
};