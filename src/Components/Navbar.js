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
    { id: 7, voceLi: "Media Overall", linkTo: "/media-overall" },
    { id: 8, voceLi: "Saldo Punti", linkTo: "/saldo-punti" },
    {
      id: 9,
      voceLi: "Editor Imprevisti",
      linkTo: "/editor-imprevisti",
    },
    { id: 10, voceLi: "Imprevisti Sospesi", linkTo: "/imprevisti-sospesi" },
    { id: 11, voceLi: "Estrazione Libera", linkTo: "/estrazione-libera" },
    { id: 12, voceLi: "Impostazioni App", linkTo: "/impostazioni-app" },
    { id: 13, voceLi: "Istruzioni", linkTo: "/istruzioni" },
  ];

  //Sostituire div con <Link> from react-router
  const linksMenu = dettagliMenu?.map((voce) => {
    return (
      <div key={voce.id}>
        <motion.li
          layout
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            duration: 0.4,
            ease: "easeIn",
            stiffness: 200,
          }}
          className="group relative p-2 px-8 text-base font-bold uppercase hover:text-[rgb(var(--clr-ter))] 2xl:p-4 2xl:text-xl"
        >
          <Link to={voce.linkTo}>{voce.voceLi}</Link>
        </motion.li>
      </div>
    );
  });

  return (
    <nav className="fixed z-[1000] flex h-auto w-full select-none items-center justify-between px-2 py-1 xl:px-6 xl:py-3">
      <div className="flex cursor-pointer items-center justify-center rounded-full hover:bg-[rgb(var(--clr-txt))]">
        <Link to="/">
          <MdHome
            size={isMobile ? 28 : 48}
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
          className="absolute top-0 z-[-1] flex h-screen w-full flex-col items-center justify-center gap-1 bg-[rgb(var(--clr-bg)/.95)] text-center text-[rgb(var(--clr-txt))] transition-all duration-300 xl:h-screen xl:w-[30vw] xl:duration-500"
        >
          {linksMenu}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
