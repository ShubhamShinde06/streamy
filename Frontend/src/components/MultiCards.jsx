import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RiArrowRightSLine } from "react-icons/ri";
import SingleCard from "../components/SingleCard";

const MultiCards = ({ data, title }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1500 }, items: 4.1 },
    desktopOne: { breakpoint: { max: 1440, min: 1390 }, items: 3.6 },
    desktopTwo: { breakpoint: { max: 1400, min: 1024 }, items: 2.5 },
    desktopThree: { breakpoint: { max: 1280, min: 1280 }, items: 0 },
    desktopFour: { breakpoint: { max: 2560, min: 2560 }, items: 6.3 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 2.2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1.8 },
    mobilesm: { breakpoint: { max: 375, min: 0 }, items: 1.6 },
    mobilesx: { breakpoint: { max: 391, min: 390 }, items: 1.7 },
  };



  return (
    <div className="w-full h-full text-white bg-black out-site-color relative">
      <main className="">
        {/* Cards */}
        <Carousel responsive={responsive} arrows={true}>
          {data?.map((item, index) => (
            <SingleCard key={index} data={item} />
          ))}
        </Carousel>
      </main>
    </div>
  );
};

export default MultiCards;
