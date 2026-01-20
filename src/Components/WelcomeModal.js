import { MdInfoOutline, MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WelcomeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    let returningUser = localStorage.getItem("avvisoModalev2");
    setIsModalOpen(!returningUser);
  }, []);

  const chiudiModale = () => {
    localStorage.setItem("avvisoModalev2", true);
    setIsModalOpen(false);
  };

  return (
    isModalOpen && (
      <>
        <motion.div
          className="fixed left-1/2 top-1/2 z-[1001] flex h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-xl border-8 border-[rgb(var(--clr-btn))] bg-[rgb(var(--clr-bg))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeOut",
            delay: 0.5,
            duration: 0.7,
            type: "spring",
          }}
        >
          <MdInfoOutline size={56} />
          <h2 className="bold font-H2 text-3xl md:text-6xl">Benvenuta/o!</h2>
          <p className="font-Descr w-4/5 text-center text-xl md:w-1/2 md:text-2xl">
            Apri il menu in alto a destra e clicca su{" "}
            <span className="font-bold">ISTRUZIONI</span> per iniziare con la
            videoguida.
          </p>
          <p className="font-Descr w-4/5 text-center text-xl md:w-1/2 md:text-2xl">
            Ricorda che gli imprevisti che trovi preimpostati sono solo per
            DEMO: puoi modificare, eliminarw e, soprattutto,{" "}
            <strong>INTEGRARE</strong> come vuoi!
          </p>
          <p className="font-Descr w-4/5 text-center text-xl md:w-1/2 md:text-2xl">
            Visita la sezione <strong>EDITOR</strong>.
          </p>
          {/* <p className="flex animate-pulse items-center justify-center rounded-lg bg-[rgb(var(--clr-sec))] p-2 text-sm font-bold md:h-12 md:w-1/2 md:text-xl">
            NUOVA VERSIONE RILASCIATA
          </p>*/}
          <button
            className="absolute bottom-5 left-1/2 w-3/4 -translate-x-1/2 rounded-lg bg-[rgb(var(--clr-btn))] px-4 py-2 text-sm font-semibold uppercase md:w-1/3 md:text-xl"
            onClick={chiudiModale}
          >
            Ok... NON MOSTRARE di nuovo!
          </button>
          <MdClose
            size={28}
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </motion.div>
      </>
    )
  );
};

export default WelcomeModal;
