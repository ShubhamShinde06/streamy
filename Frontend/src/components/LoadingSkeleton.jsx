import { motion } from "framer-motion";
import MotionCard from "./MotionCard";

const LoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="w-full h-screen flex items-center justify-center text-white relative bg-black"
    >
      {/* Large Screen Skeleton */}
      <div className="absolute inset-0 p-8 text-white hidden lg:flex flex-col gap-6">
        {/* Header Skeleton */}
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-5 px-10 rounded-md text-xl bg-[#3F3F3F] animate-pulse"
            ></div>
          ))}
        </div>

        {/* Title & Description Skeleton */}
        <div className="w-3/4 h-16 bg-[#3F3F3F] rounded-md animate-pulse"></div>
        <div className="w-1/2 h-40 bg-[#3F3F3F] rounded-md animate-pulse"></div>

        {/* Button Skeleton */}
        <div className="w-1/6 h-12 bg-[#3F3F3F] rounded-md animate-pulse"></div>
      </div>

      {/* Small Screen Skeleton */}
      <div className="lg:hidden absolute top-[45%] w-full flex justify-center animate-pulse">
        <div className="w-[95%] flex flex-col items-center gap-4">
          <div className="w-full h-[150px] rounded-xl bg-[#242426] p-2">
            {/* Card Content Skeleton */}
            <div className="flex flex-col gap-2 border-b-2 border-[#383A3F] pb-2">
              <div className="w-16 p-2 rounded-md bg-[#323337] animate-pulse"></div>
              <div className="w-full h-6 bg-[#3F3F3F] rounded-md animate-pulse"></div>
            </div>

            {/* Buttons & Icon Skeleton */}
            <div className="flex justify-between pt-2">
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-[#323337] rounded-md animate-pulse"></div>
                <div className="w-10 h-6 bg-[#323337] rounded-md animate-pulse"></div>
              </div>
              <div className="w-10 h-10 bg-[#6351CF] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-120 flex items-center p-2">
        {[...Array(3)].map((_, i) => (
          <MotionCard key={i}/>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
