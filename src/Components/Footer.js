//import { color } from "framer-motion";
import { isMobile } from "react-device-detect";

const Footer = () => {
  // const { session } = props;

  return (
    <footer
      className={
        isMobile
          ? "hidden"
          : "absolute bottom-0 left-0 m-1 flex w-full justify-between text-sm"
      }
    >
      <small className="z-10 ps-4 opacity-20">
        coded by tgalex75 - Falconero Community - beta version
      </small>
    </footer>
  );
};

export default Footer;
