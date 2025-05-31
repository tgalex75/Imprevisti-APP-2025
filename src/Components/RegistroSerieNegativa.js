import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAddCircleOutline, MdRemoveCircleOutline, MdDeleteForever } from "react-icons/md";
import { CartContext } from "../context/regContext";

const RegistroSerieNegativa = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="flex h-72 w-full flex-col items-center gap-2 rounded-xl text-[rgb(var(--clr-txt))] xl:absolute xl:left-1 xl:top-1 xl:h-96 xl:w-[24vw]"
    >
      <h6 className="uppercase bg-[rgb(var(--clr-prim))] w-full rounded-t">Registro Giocatori</h6>
      <AnimatePresence initial={false} mode="popLayout">
        <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto px-1 pb-2">
          {cartItems.map((item, i) => (
            <motion.div
              key={i}
              layout={true}
              initial={{ opacity: 0, y: -300 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              style={
                item.quantity > 2
                  ? { backgroundColor: "orange", color: "black" }
                  : {}
              }
              className="flex items-center justify-between ps-1 text-left text-[0.6rem] uppercase hover:bg-[rgb(var(--clr-btn)/.5)] cursor-pointer"
            >
              <small className="text-xs font-semibold uppercase md:text-sm">
                {item.title}
              </small>
              <div className="flex items-center pr-2">
                <MdAddCircleOutline
                  size={18}
                  style={item.quantity > 2 ? { visibility: "hidden" } : {}}
                  className="rounded-full hover:scale-125"
                  onClick={() => {
                    addToCart(item);
                  }}
                />
                <small className="mx-2 xl:mx-4 text-lg font-bold uppercase">
                  {item.quantity >= 3 ? 3 : item.quantity}
                </small>
                {item.quantity < 2 ? <MdDeleteForever
                  onClick={() => {
                    removeFromCart(item);
                  }}
                  size={20}
                  className="rounded-full hover:scale-125"
                />:
                <MdRemoveCircleOutline
                  onClick={() => {
                    removeFromCart(item);
                  }}
                  size={18}
                  className="rounded-full hover:scale-125"
                />}
              </div>
            </motion.div>
          ))}
        </ul>
      </AnimatePresence>
      <button className="block h-8 w-full rounded-b hover:bg-[rgb(var(--clr-btn)/.7)] bg-[rgb(var(--clr-btn)/.5)]" onClick={clearCart}>
        Resetta lista
      </button>
    </motion.div>
  );
};

export default RegistroSerieNegativa;
