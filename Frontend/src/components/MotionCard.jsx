import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={"#"}
        className="lg:w-[340px] ml-2 lg:ml-0 lg:h-[260px] md:w-[170px] w-[200px] h-[200px] rounded-md cursor-pointer overflow-hidden scroll-hover block"
      >
        {/* Image Container */}
        <motion.div
          className="lg:w-[340px] lg:h-[200px] md:w-[170px] w-[200px]   h-[130px] rounded-md cursor-pointer overflow-hidden relative"
          whileHover={{ scale: 1.02 }}
        >
          {/* Rating Badge */}
          {'' && (
            <motion.div
              className="absolute w-8 h-5 bg-[#323337]  rounded-sm  text-xs text-white flex items-center justify-center left-2 top-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {}
            </motion.div>
          )}

          {/* Image for different screen sizes */}
          <div
            src={""}
            alt="streamy"
            className="w-full h-full lg:hidden block bg-[#323337] "
          ></div>
          <div
            src={""}
            alt="streamy"
            className="w-full h-full lg:block hidden bg-[#323337] "
          ></div>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          className="flex flex-col pt-2 line-clamp-1 "
          whileHover={{ scale: 1.01 }}
        >
          <h1 className="text-xl bg-[#323337] "></h1>
          <p className="text-xs line-clamp-1 text-[#8B8E93] pl-1 bg-[#323337] " ></p>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default MotionCard;
