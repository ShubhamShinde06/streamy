import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesApi } from "../API/moviesAPI";

const PlayerMovie = () => {
  const { id } = useParams();
  const [videoLink, setVideoLink] = useState("");

  const { data, isLoading, error, movieVideoLinkGet } = moviesApi();

  useEffect(() => {
    if (id) {
      movieVideoLinkGet(id);
    }
  }, [id, movieVideoLinkGet]);

  useEffect(() => {
    if (data?.video_link) {
      setVideoLink(data.video_link);
    }
  }, [data]);

  if (error)
    return <p className="text-center text-red-500">Error loading video.</p>;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <svg width="100" height="20" viewBox="0 0 100 20">
            <g className="g-group">
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

              .dot:nth-child(2) {
                animation-delay: 0.2s;
              }
              .dot:nth-child(3) {
                animation-delay: 0.4s;
              }
              .dot:nth-child(4) {
                animation-delay: 0.6s;
              }
              .dot:nth-child(5) {
                animation-delay: 0.8s;
              }

              @keyframes bounce {
                0%, 80%, 100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-10px);
                }
              }
            `}
          </style>
        </div>
      ) : (
        <iframe
          src={videoLink}
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default PlayerMovie;
