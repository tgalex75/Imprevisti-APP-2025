import { motion } from "framer-motion";
import  random  from "random";

const LayoutBase = ({ titoloH1, isImprev, casuale, children }) => {
  return (
    <section
      className="flex h-dvh w-full select-none flex-col items-center justify-start lg:gap-2 p-4 font-bold xl:justify-around xl:p-8"
    >
      {/* BOX PRIMA ESTRAZIONE */}
      <h1>{titoloH1}</h1>
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={random.float()}
        style={isImprev === 1 && { color: "rgb(var(--clr-ter))" }}
        className="flex h-full w-full select-none flex-col items-center text-center justify-around gap-4 rounded-xl px-4 py-2 shadow-lg ring ring-inset ring-[rgb(var(--clr-txt))] xl:justify-evenly xl:gap-2 xl:px-10"
      >
        {!casuale && (
          <h2 className="flex h-full items-center justify-center text-5xl italic">
            Vai!
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  );
};

export default LayoutBase;
