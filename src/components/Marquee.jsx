import React from "react";

function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-gray-900 py-3">
      <div className="marquee">
        <div className="marquee__inner">

          <div className="marquee__group">
            <span>Free delivery on orders above ₦50,000</span>
            <span>New arrivals dropping weekly</span>
            <span>Premium quality. Honest prices.</span>
            <span>Pay on delivery available</span>
            <span>Exclusive deals this week</span>
            <span>Fastest shipping guaranteed</span>
          </div>


          <div className="marquee__group">
            <span>Free delivery on orders above ₦50,000</span>
            <span>New arrivals dropping weekly</span>
            <span>Premium quality. Honest prices.</span>
            <span>Pay on delivery available</span>
            <span>Exclusive deals this week</span>
            <span>Fastest shipping guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marquee;
