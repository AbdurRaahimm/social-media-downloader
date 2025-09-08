import { useState } from "react";
import StarRating from "./StarRating";
import { toast } from "react-toastify";
import { saveToSheet } from "../utils/utils";

export default function Chatbot() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      toast.error("Please provide feedback.");
      return;
    }
    if (rating <= 0) {
      toast.error("Please select a rating.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        Rating: rating,
        Feedback: feedback,
      };
      const result = await saveToSheet(payload);
      console.log(result);
      if (result) {
        toast.success("Feedback submitted. Thank you!");
      } else {
        toast.info("Submitted. Check sheet to confirm.");
      }
      setStep(3);
    } catch (err) {
      toast.error("Failed to submit feedback. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-sm mt-8">
      <div className="flex flex-col space-y-4">
        {step >= 1 && (
          <div className="flex items-end">
            <div className="bg-slate-700 rounded-lg p-3 max-w-xs">
              <p className="text-slate-100">How would you rate our service?</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex items-end justify-end">
            <div className="bg-indigo-600 rounded-lg p-3 max-w-xs">
              <StarRating rating={rating} onRating={handleRating} />
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="flex items-end">
            <div className="bg-slate-700 rounded-lg p-3 max-w-xs">
              <p className="text-slate-100">Please provide your feedback.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex items-end justify-end">
            <div className="bg-indigo-600 rounded-lg p-3 max-w-xs w-full">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your feedback..."
                className="w-full bg-slate-900/70 border border-slate-700 text-slate-100 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300"
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="mt-2 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="flex items-end">
            <div className="bg-slate-700 rounded-lg p-3 max-w-xs">
              <p className="text-slate-100">Thank you for your feedback!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
