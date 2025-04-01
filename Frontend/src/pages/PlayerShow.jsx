import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showsApi } from "../API/showsAPI";

const PlayerShow = () => {
  const { seriesId, episodeId } = useParams();
  const [videoLink, setVideoLink] = useState("");

  const { data, isLoading, error, showVideoLinkGet } = showsApi();

  useEffect(() => {
    if (seriesId && episodeId) {
      showVideoLinkGet(seriesId, episodeId);
    }
  }, [seriesId, episodeId]);

  useEffect(() => {
    if (data?.videoLink) {
      setVideoLink(data.videoLink);
    }
  }, [data]);



  if (error) return <p className="text-center text-red-500">Error loading video.</p>;

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <svg width="100" height="20" viewBox="0 0 100 20">
            <g>
              <circle className="dot" cx="10" cy="10" r="5" fill="white" />
              <circle className="dot" cx="30" cy="10" r="5" fill="white" />
              <circle className="dot" cx="50" cy="10" r="5" fill="white" />
              <circle className="dot" cx="70" cy="10" r="5" fill="white" />
              <circle className="dot" cx="90" cy="10" r="5" fill="white" />
            </g>
          </svg>

          {/* CSS for animation */}
          <style>
            {`
              .dot {
                animation: bounce 1.2s infinite ease-in-out;
              }

              .dot:nth-child(2) { animation-delay: 0.2s; }
              .dot:nth-child(3) { animation-delay: 0.4s; }
              .dot:nth-child(4) { animation-delay: 0.6s; }
              .dot:nth-child(5) { animation-delay: 0.8s; }

              @keyframes bounce {
                0%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
              }
            `}
          </style>
        </div>
      ) : (
        videoLink ? (
          <iframe
            src={videoLink}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-center text-white">No video available.</p>
        )
      )}
    </div>
  );
};

export default PlayerShow;
