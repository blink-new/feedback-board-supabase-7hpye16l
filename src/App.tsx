
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { FeedbackForm } from "./components/FeedbackForm";
import { FeedbackList } from "./components/FeedbackList";
import { FeedbackItem } from "./components/FeedbackCard";
import { MessageCircle } from "lucide-react";

function App() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    supabase
      .from("feedback")
      .select("*")
      .order("votes", { ascending: false })
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setError("Failed to load feedback.");
        } else {
          setFeedback(data as FeedbackItem[]);
        }
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [refresh]);

  // Animation for fade-in
  useEffect(() => {
    document.body.classList.add("bg-gradient-to-br", "from-blue-50", "to-purple-100", "min-h-screen");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-2 pb-10">
      <header className="w-full max-w-2xl mx-auto py-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Feedback Board
          </h1>
        </div>
        <p className="text-gray-500 text-center max-w-md">
          Share your ideas and vote for your favorites. Help us improve!
        </p>
      </header>
      <FeedbackForm onSubmitted={() => setRefresh((r) => r + 1)} />
      <FeedbackList
        items={feedback}
        onVoted={() => setRefresh((r) => r + 1)}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;