import React, { useState } from "react";
import { Sparkles, LoaderCircle, MessageSquareText } from "lucide-react";
import './styles.css'

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setAnswer(data.response);
    } catch (err) {
      setError("❌ Oops! Something went wrong. Try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "🔍 How to check stock?",
      a: "Just type the item's name or ID, and I’ll fetch the inventory for you.",
    },
    {
      q: "📦 Need reorder tips?",
      a: "Ask something like ‘What should I reorder for Store 102?’",
    },
    {
      q: "📊 Want future demand?",
      a: "Say something like ‘Forecast demand for item 501 for next 45 days.’",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6 flex flex-col items-center justify-center font-sans con">
      <div className="w-full max-w-4xl bg-white/90 shadow-xl border border-indigo-200 rounded-3xl p-8 ">
        <div className="flex items-center gap-3 mb-6 ">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Ask Inventory Assistant</h2>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="💡 e.g. What should I reorder for Store 102?"
            className="flex-1 px-4 py-3 text-base border in-query border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-5 py-3 text-sm sm:text-base font-semibold but-query rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 shadow ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <MessageSquareText className="w-2 h-4" />
              </>
            )}
          </button>
        </div>

        {answer && (
          <div className="mt-6 bg-indigo-50 p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">💬 Assistant's Response:</h3>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{answer}</p>
          </div>
        )}

        {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
      </div>

      <div className="w-full max-w-4xl mt-10 bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">📚 FAQs — Things You Can Ask</h3>
        <ul className="space-y-4">
          {faqs.map((item, index) => (
            <li
              key={index}
              className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-indigo-50 hover:scale-[1.01] transition"
            >
              <p className="text-indigo-700 font-medium">{item.q}</p>
              <p className="text-gray-700 mt-1 text-sm">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AskAssistant;