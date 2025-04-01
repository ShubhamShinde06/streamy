import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { mixApi } from "../API/mixAPI";
import { toast } from "react-toastify";

const Report = ({ setReportShow, itemId, userId, itemType }) => {
  const { reportAdd, message, error, isLoading } = mixApi();

  const [selectedIssue, setSelectedIssue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIssue) {
      toast.error("Please select an issue type.");
      return;
    }

    try {
      setLoading(true);
      reportAdd(userId, itemId, itemType, selectedIssue, description);
      toast.success("Report added successfully");
      setReportShow(false);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2">
      <div className="w-[400px] bg-[#303030] rounded-xl p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full  hover:bg-gray-500 transition"
          onClick={() => setReportShow(false)}
        >
          <RxCross2 className="text-xl text-white" />
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-white mb-5">
          Report an Issue
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Issue Selection Buttons */}
          <div className="flex flex-wrap gap-2 text-[15px] text-white">
            {[
              { id: "content", label: "Content Issue", value: "content_issue" },
              {
                id: "playback",
                label: "Playback Problem",
                value: "playback_problem",
              },
              {
                id: "download",
                label: "Download Problem",
                value: "download_problem",
              },
              {
                id: "crash",
                label: "Crashes During Playback",
                value: "crash_during_playback",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={`px-2 py-2 rounded-lg transition ${
                  selectedIssue === item.value
                    ? "bg-[#6351CF]"
                    : "bg-[#000000] hover:bg-gray-700/60"
                }`}
                onClick={() => setSelectedIssue(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Description Input */}
          <textarea
            className="w-full h-28 p-3 rounded-lg border border-gray-500 text-white bg-[#000000] focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
            placeholder="Describe the problem..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 text-lg font-medium rounded-lg transition-all shadow-md ${
              loading
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-[#6351CF] hover:bg-blue-700 text-white"
            }`}
            disabled={loading}
          >
            {isLoading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
