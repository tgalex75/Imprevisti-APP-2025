//import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { motion } from "framer-motion";
import { GiPerspectiveDiceOne } from "react-icons/gi";
import useFetchData from "../Hooks/useFetchData";
import { supabase } from "../supabaseClient";

const Dado = (props) => {
  const { clickFunc } = props;
  const { data } = useFetchData("preferenze-immagini");

  const dadoImg = data.filter((item) => item.id === 9)[0]?.url;
  const urlDiretto = `${supabase.storageUrl}/object/public/immagini/${dadoImg}`;
  

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotate: dadoImg ? null : 15,
      }}
      whileTap={{
        scale: 1.1,
        rotate: dadoImg ? null : -30,
      }}
      onClick={clickFunc}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute bottom-2 right-2 mb-20 flex h-24 w-24 cursor-pointer select-none items-center justify-center md:m-4 xl:bottom-0 xl:right-0 xl:mb-14 xl:me-4 xl:h-32 xl:w-32"
      style={
        dadoImg
          ? {
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${urlDiretto})`,
            }
          : {}
      }
    >
      {!dadoImg && <GiPerspectiveDiceOne size={"100%"} />}
    </motion.div>
  );
};

export default Dado;
