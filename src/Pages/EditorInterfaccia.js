import React, { useContext } from "react";
import ColorPickerComponent from "../Components/ColorPickerComponent";
import { motion } from "framer-motion";
import ColorContext from "../context/colorContext";

const EditorInterfaccia = () => {
  const {
    primary,
    secondary,
    tertiary,
    updatePrimary,
    updateSecondary,
    updateTertiary
  } = useContext(ColorContext);

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-12 p-4 font-bold">
      <h1>Registro Giocatori</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="h-full w-full items-center justify-around gap-2 overflow-hidden rounded-lg bg-black/50 p-4 text-gray-300 xl:flex"
      >
        <ColorPickerComponent defaultColor={primary} updateFunc={updatePrimary} />
        <ColorPickerComponent defaultColor={secondary} updateFunc={updateSecondary} />
        <ColorPickerComponent defaultColor={tertiary} updateFunc={updateTertiary} />
      </motion.div>
    </section>
  );
};

export default EditorInterfaccia;
