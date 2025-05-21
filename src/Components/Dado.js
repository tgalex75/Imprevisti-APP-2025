//import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { motion } from "framer-motion";
//import { isMobile } from "react-device-detect";
import { GiPerspectiveDiceOne } from "react-icons/gi";
const Dado = (props) => {
  const { clickFunc } = props;

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotate: 30
      }}
      whileTap={{
        scale: 1.2,
        rotate: -90
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute bottom-2 right-2 mb-20 flex h-24 w-24 xl:h-36 xl:w-36 cursor-pointer select-none items-center justify-center md:m-4 xl:bottom-0 xl:right-0 xl:mb-14 xl:me-4"
      onClick={clickFunc}
    >
      <GiPerspectiveDiceOne size={"100%"} />
    </motion.div>
  );
};

export default Dado;
