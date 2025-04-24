
import React from "react";
import { FeedbackItem, FeedbackCard } from "./FeedbackCard";

interface FeedbackListProps {
  items: FeedbackItem[];
  onVoted: () => void;
  loading: boolean;
  error: string | null;
}

export const FeedbackList: React.FC<FeedbackListProps> = ({
  items,
  onVoted,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10 animate-pulse">
        Loading feedback...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No feedback yet. Be the first to submit an idea!
      </div>
    );
  }
  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item) => (
        <FeedbackCard key={item.id} item={item} onVoted={onVoted} />
      ))}
    </div>
  );
};