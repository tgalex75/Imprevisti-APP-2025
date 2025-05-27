import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EditorImprevisti = () => {
  const menu = [
    { id: 1, nome: "Prepartita", linkTo: "/editor-prepartita" },
    { id: 2, nome: "Settimana", linkTo: "/editor-settimana" },
    { id: 3, nome: "Serie Negativa", linkTo: "/editor-serie-negativa" },
    { id: 4, nome: "Ingaggi e Mercato", linkTo: "/editor-ingaggi" },
    { id: 5, nome: "Speciali", linkTo: "/editor-speciali" },
    { id: 6, nome: "Saldo Punti", linkTo: "/editor-saldo-punti" },
  ];

  return (
    <section className="flex h-full w-full flex-col items-center overflow-y-auto p-2 font-semibold xl:overflow-y-hidden xl:font-bold">
      <h1 className="h-fit">Editor Imprevisti</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex h-full w-full flex-col items-center justify-around gap-2 rounded-lg bg-[rgb(var(--clr-bg)/.5)] text-[--clr-txt]"
      >
        <h2>Scegli quale lista di imprevisti modificare</h2>
        <main className="grid h-full w-full grid-cols-2 gap-2 p-4 xl:grid-cols-3">
          {menu.map((voce) => (
            <Link to={voce.linkTo} key={voce.id} className="border border-[--clr-btn] p-2 text-bold uppercase flex items-center justify-center text-center text-xl xl:text-5xl hover:bg-[--clr-btn]">
              <h3>{voce.nome}</h3>
            </Link>
          ))}
        </main>
      </motion.div>
    </section>
  );
};
export default EditorImprevisti;
