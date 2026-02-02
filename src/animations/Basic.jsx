import { motion } from "framer-motion";
import React, { useRef } from "react";

function Basic() {
  const constraintRef = useRef(null);

  return (
    <div className="flex h-screen justify-center items-center gap-24">

      {/* Left */}
      <motion.div
        ref={constraintRef}
        className="w-[500px] h-[500px] bg-blue-500/20 rounded-2xl flex items-center justify-center"
      >
        <motion.div
          className="bg-orange-500 rounded-2xl p-4 w-20 h-20"
          drag
          dragElastic={0.2}
          dragConstraints={constraintRef}
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </motion.div>

      {/* Right */}
      <motion.div
        className="w-[500px] h-[500px] bg-blue-500/20 rounded-2xl p-6 overflow-y-auto"
      >
        <div className="space-y-4 text-center font-medium">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Aliquam ac rhoncus quam.</p>
          <p>
            Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
            imperdiet sagittis justo.
          </p>
          <p>
            In viverra fermentum ex ac vestibulum. Aliquam eleifend nunc a luctus
            porta.
          </p>
          <p>Mauris laoreet augue ut felis blandit.</p>
          <p>
            Nulla facilisi. Vestibulum cursus ipsum tellus, eu tincidunt neque
            tincidunt a.
          </p>
          <p>
            Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
          </p>
          <p>
            Morbi ut scelerisque nibh. Integer auctor, massa non dictum
            tristique.
          </p>
          <p>
            Proin sit amet lacus mollis, semper massa ut, rutrum mi.
          </p>
          <p>
            Donec ut volutpat ante, ut suscipit leo. Vestibulum bibendum at erat
            sit amet pulvinar.
          </p>
        </div>
      </motion.div>

    </div>
  );
}

export default Basic;
