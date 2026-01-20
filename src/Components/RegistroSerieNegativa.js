/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import Spinner from "./Spinner";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDeleteForever,
} from "react-icons/md";
import { CartContext } from "../context/regContext";

const RegistroSerieNegativa = (props) => {
  const { dbReady } = props;

  const { registro: cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  if (!dbReady) {
    return <Spinner />; // Mostra lo spinner se dbReady non è true
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="flex h-72 w-full flex-col items-center gap-2 rounded-xl text-[rgb(var(--clr-txt))] xl:absolute xl:left-1 xl:top-1 xl:h-96 xl:w-[24vw]"
    >
      <h6 className="w-full rounded-t bg-[rgb(var(--clr-prim))] uppercase">
        Registro Giocatori
      </h6>
      <AnimatePresence initial={false} mode="popLayout">
        <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto px-1 pb-2">
          {cartItems?.map((item, i) => (
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
              className="flex cursor-pointer items-center justify-between ps-1 text-left text-[0.6rem] uppercase hover:bg-[rgb(var(--clr-btn)/.5)]"
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
                <small className="mx-2 text-lg font-bold uppercase xl:mx-4">
                  {item.quantity >= 3 ? 3 : item.quantity}
                </small>
                {item.quantity < 2 ? (
                  <MdDeleteForever
                    onClick={() => {
                      removeFromCart(item);
                    }}
                    size={20}
                    className="rounded-full hover:scale-125"
                  />
                ) : (
                  <MdRemoveCircleOutline
                    onClick={() => {
                      removeFromCart(item);
                    }}
                    size={18}
                    className="rounded-full hover:scale-125"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </ul>
      </AnimatePresence>
      <button
        className="block h-8 w-full rounded-b bg-[rgb(var(--clr-btn)/.5)] hover:bg-[rgb(var(--clr-btn)/.7)]"
        onClick={clearCart}
      >
        Resetta lista
      </button>
    </motion.div>
  );
};

export default RegistroSerieNegativa;
