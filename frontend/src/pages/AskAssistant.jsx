import React, { useState } from "react";
import { Sparkles, Loader } from "lucide-react";

const AskAssistant = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/rag-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log(data);
      setAnswer(data.response);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-blue-600 w-6 h-6" />
        <h2 className="text-3xl font-bold text-gray-800">Ask Inventory Assistant</h2>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about stock levels, demand trends, recommendations..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition ${
          loading && "cursor-not-allowed opacity-80"
        }`}
      >
        {loading ? (
          <>
            <Loader className="animate-spin w-5 h-5" />
            Thinking...
          </>
        ) : (
          "Ask"
        )}
      </button>

      {answer && (
        <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 shadow-sm animate-fade-in">
          <h3 className="font-semibold mb-2">💬 Assistant's Response:</h3>
          <p className="leading-relaxed whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      {error && (
        <p className="text-red-600 mt-4 font-medium animate-shake">{error}</p>
      )}
    </div>
  );
};

export default AskAssistant;
