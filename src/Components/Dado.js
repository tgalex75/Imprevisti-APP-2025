//import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GiPerspectiveDiceOne } from "react-icons/gi";
import { db } from "../Db/db";

const Dado = (props) => {
  const { clickFunc } = props;
  const [logoURL, setLogoURL] = useState(null);

  const fetchLogoURL = async () => {
    const record = await db.preferenzeImmagini.get(9);
    if (record && record.url) {
      const imageUrl = URL.createObjectURL(record.url);
      setLogoURL(imageUrl);
      // Usa imageUrl nel tag <img src={imageUrl} />
    }
  };

  useEffect(() => {
    fetchLogoURL();
  }, []);

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotate: /* dadoImg ? null : */ 15,
      }}
      whileTap={{
        scale: 1.1,
        rotate: /* dadoImg ? null : */ -30,
      }}
      onClick={clickFunc}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute bottom-2 right-2 mb-20 flex h-24 w-24 cursor-pointer select-none items-center justify-center md:m-4 xl:bottom-0 xl:right-0 xl:mb-14 xl:me-4 xl:h-32 xl:w-32"
      style={
        logoURL
          ? {
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${logoURL})`,
            }
          : {}
      }
    >
      {!logoURL && <GiPerspectiveDiceOne size={"100%"} />}
    </motion.div>
  );
};

export default Dado;
