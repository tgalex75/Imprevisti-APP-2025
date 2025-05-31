import { useState } from "react";
import { MdHome, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => {
    setIsOpenMenu((prevMenu) => !prevMenu);
  };

  const dettagliMenu = [
    { id: 1, voceLi: "Home", linkTo: "/" },
    { id: 2, voceLi: "Imprevisto Prepartita", linkTo: "/prepartita" },
    { id: 3, voceLi: "Imprevisto Settimanale", linkTo: "/settimana" },
    {
      id: 4,
      voceLi: "Imprevisto Serie Negativa",
      linkTo: "/serie-negativa",
    },
    {
      id: 5,
      voceLi: "Imprevisti Calciomercato",
      linkTo: "/offerte-mercato",
    },
    { id: 6, voceLi: "Imprevisti di Ingaggio", linkTo: "/ingaggio" },
    { id: 7, voceLi: "Saldo Punti", linkTo: "/saldo-punti" },
    { id: 8, voceLi: "Editor Imprevisti", linkTo: "/editor-imprevisti" },
    { id: 9, voceLi: "Imprevisti Sospesi", linkTo: "/imprevisti-sospesi" },
    { id: 10, voceLi: "Estrazione Libera", linkTo: "/estrazione-libera" },
    { id: 11, voceLi: "Editor Interfaccia", linkTo: "/editor-interfaccia" },
  ];

  //Sostituire div con <Link> from react-router
  const linksMenu = dettagliMenu.map((voce) => {
    return (
      <div key={voce.id}>
        <Link to={voce.linkTo}>
          <motion.li
            layout
            whileHover={{ scale: 1.2 }}
            transition={{
              type: "spring",
              duration: 0.4,
              ease: "easeIn",
              stiffness: 200,
            }}
            className="lg :text-xl p-4 px-8 text-lg font-bold uppercase hover:text-[rgb(var(--clr-ter))] xl:text-2xl"
          >
            {voce.voceLi}
          </motion.li>
        </Link>
      </div>
    );
  });

  return (
    <nav className="fixed z-[1000] flex h-auto w-full select-none items-center justify-between px-2 py-1 xl:px-6 xl:py-3">
      <div
        style={isMobile ? { visibility: "hidden" } : {}}
        className="flex cursor-pointer items-center justify-center rounded-full hover:bg-[rgb(var(--clr-txt))]"
      >
        <Link to="/">
          <MdHome
            size={50}
            className="fill-[rgb(var(--clr-txt))] p-2 hover:fill-[rgb(var(--clr-bg))]"
          />
        </Link>
      </div>
      <div className="flex h-12 w-12 items-center justify-center">
        {!isOpenMenu ? (
          <MdMenu
            size={isMobile ? 28 : 48}
            className="cursor-pointer rounded-full fill-[rgb(var(--clr-txt))] p-2 hover:bg-[rgb(var(--clr-txt))] hover:fill-[rgb(var(--clr-bg))]"
            onClick={handleClick}
          />
        ) : (
          <MdClose
            size={isMobile ? 28 : 48}
            className="cursor-pointer rounded-full fill-[rgb(var(--clr-txt))] p-2 hover:bg-[rgb(var(--clr-txt))] hover:fill-[rgb(var(--clr-bg))]"
            onClick={handleClick}
          />
        )}
        <ul
          style={isOpenMenu ? { right: 0 } : { right: "-100%" }}
          onClick={handleClick}
          className="absolute top-0 z-[-1] flex h-screen w-full flex-col items-center gap-3 justify-center bg-[rgb(var(--clr-bg)/.95)] text-center text-[rgb(var(--clr-txt))] transition-all duration-300 xl:duration-500 xl:h-screen xl:w-[30vw] xl:gap-2"
        >
          {linksMenu}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
