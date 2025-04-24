
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { ThumbsUp } from "lucide-react";

export interface FeedbackItem {
  id: number;
  title: string;
  description: string;
  votes: number;
}

interface FeedbackCardProps {
  item: FeedbackItem;
  onVoted: () => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ item, onVoted }) => {
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(
    !!localStorage.getItem(`voted_${item.id}`)
  );

  const handleVote = async () => {
    if (hasVoted || voting) return;
    setVoting(true);
    // Optimistic UI
    setHasVoted(true);
    localStorage.setItem(`voted_${item.id}`, "1");
    const { error } = await supabase
      .from("feedback")
      .update({ votes: item.votes + 1 })
      .eq("id", item.id);
    setVoting(false);
    onVoted();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-4 flex flex-col gap-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium transition
            ${hasVoted
              ? "bg-blue-100 text-blue-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
          onClick={handleVote}
          disabled={hasVoted || voting}
          aria-label="Upvote"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{item.votes}</span>
        </button>
      </div>
      {item.description && (
        <p className="text-gray-600 text-sm">{item.description}</p>
      )}
    </div>
  );
};