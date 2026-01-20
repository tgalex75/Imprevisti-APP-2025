import { useContext, useRef } from "react";
import { CartContext } from "../context/regContext";

const UploadRegistro = (props) => {
  const { titolo } = props;
  const { addToCart } = useContext(CartContext);
  
  const inputRef = useRef(null);
  const resetInput = ()=> {
    inputRef.current.value = ""
  }
  const addToCartAndClearInput = ()=> {
    addToCart({
      title: `${inputRef.current.value} - ${titolo}`.toUpperCase(),
      quantity: 1,
    })
    resetInput()
  }

  return (
    <div className="mb-6 flex w-full flex-col items-center md:w-3/4">
      <label
        htmlFor="nome-giocatore"
        className="mb-1 inline-block text-xs text-[rgb(var(--clr-txt))] md:text-sm"
      >
        Giocatore da iscrivere sul registro

      </label>
      <div className="flex h-1/2 w-1/2 items-center justify-between gap-1">
        <input
          ref={inputRef}
          type="text"
          id="nome-giocatore"
          className="h-full w-full appearance-none rounded-lg border border-[rgb(var(--clr-btn))] bg-[rgb(var(--clr-bg))] px-1 py-2 text-xs text-[rgb(var(--clr-txt))] placeholder-[rgb(var(--clr-txt))] shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[rgb(var(--clr-btn))] md:px-4 md:text-sm"
          name="nomeGiocatore"
          placeholder="Fuori il nome..."
        />
        <button
          type="button"
          className="flex h-full w-full items-center justify-center rounded-lg bg-[rgb(var(--clr-btn))] px-4 py-2 text-center text-xs font-semibold text-[rgb(var(--clr-txt))] shadow-md transition duration-200 ease-in hover:bg-[rgb(var(--clr-ter))] md:text-sm"
          onClick={() =>
            addToCartAndClearInput()
          }
        >
          Invia
        </button>
      </div>
    </div>
  );
};

export default UploadRegistro;
