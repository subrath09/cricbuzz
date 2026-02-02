import React from "react";
import { motion } from "framer-motion";

import img from "../assets/biocon.png";
import img2 from "../assets/britannia.png";
import img3 from "../assets/cargill.png";
import img4 from "../assets/itc.png";
import img5 from "../assets/tata.png";
import img6 from "../assets/Pfizer.png";

const logos = [img, img2, img3, img4, img5, img6];

function Herobottom() {
  return (
    <div className="w-full overflow-hidden mt-10">
      <motion.div
        className="flex gap-24 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* First set */}
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            className="h-20 w-auto object-contain"
            alt="logo"
          />
        ))}

        {/* Duplicate set (required for seamless loop) */}
        {logos.map((logo, index) => (
          <img
            key={`dup-${index}`}
            src={logo}
            className="h-20 w-auto object-contain"
            alt="logo"
          />
        ))}
      </motion.div>
    </div>
  );
}

export default Herobottom;
