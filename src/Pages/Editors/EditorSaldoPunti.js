import { useContext, useEffect, useState, useRef } from "react";
import { supabase } from "../../supabaseClient";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteForever } from "react-icons/md";
import DatiImprevistiContext from "../../context/datiImprevisti";

const EditorSaldoPunti = () => {
  const { bonusMalus, fetchBonusMalus } = useContext(DatiImprevistiContext);

  // Stato per memorizzare l'elemento attualmente in modifica (null se nessuno)
  const [editingItem, setEditingItem] = useState(null);

  const isListaVuota = bonusMalus.length < 1;

  // Configurazione di react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Effetto per pre-popolare il form quando editingItem cambia
  useEffect(() => {
    if (editingItem) {
      // reset() imposta i valori predefiniti del form basandosi sull'oggetto passato
      reset(editingItem);
    } else {
      // Resetta il form quando non c'è nessun elemento in modifica
      reset({});
    }
  }, [editingItem, reset]); // Rilancia l'effetto quando editingItem o reset cambiano

  // Gestore del click sull'elemento per iniziare la modifica
  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  // Gestore dell'invio del form (qui simuleremo l'aggiornamento in Supabase)
  const handleUpdateSubmit = async (data) => {
    console.log("Dati aggiornati dal form:", data);

    const {
      id,
      nome,
      valore,
      nomeUnder,
      nomeOver,
      nomeSerieMinore,
      nomeSerieMinoreOver,
      valoreUnder,
      valoreOver,
      valoreSerieMinore,
      valoreSerieMinoreOver,
    } = data;

    const { error } = await supabase
      .from("bonus-malus-punti")
      .upsert({
        id: isListaVuota ? uuidv4() : id,
        tipo: selectRefState,
        nome: nome,
        valore: valore,
        nomeUnder: nomeUnder,
        nomeOver: nomeOver,
        nomeSerieMinore: nomeSerieMinore,
        nomeSerieMinoreOver: nomeSerieMinoreOver,
        valoreUnder: valoreUnder,
        valoreOver: valoreOver,
        valoreSerieMinore: valoreSerieMinore,
        valoreSerieMinoreOver: valoreSerieMinoreOver,
      })
      .select();
    error && console.log(error);
    fetchBonusMalus();

    // *** QUI FINISCE LA LOGICA DI AGGIORNAMENTO PER SUPABASE ***

    // Dopo l'aggiornamento, resettiamo lo stato di modifica per tornare alla lista
    setEditingItem(null);
  };

  // Gestore per annullare la modifica
  const handleCancelEdit = () => {
    setEditingItem(null);
    reset();
  };

  const rmVoceDB = async (element) => {
    const { error } = await supabase
      .from("bonus-malus-punti")
      .delete()
      .eq("id", element);
    error && console.log(error);
    fetchBonusMalus();
  };

  const selectRef = useRef(null);

  const [selectRefState, setSelectRefState] = useState("cessioni");

  const handleSelectRef = () => {
    setSelectRefState(selectRef.current.value);
  };

  const listaFiltrata = bonusMalus
    .filter((element) => element.tipo === selectRefState)
    .sort((a, b) => a.id - b.id);

  return (
    <section className="flex h-full w-full flex-col items-center overflow-y-auto p-2 font-semibold xl:overflow-y-hidden xl:font-bold">
      <h1 className="h-fit">Editor Bonus/Malus Punti</h1>
      <h2 className="w-full text-center">
        Seleziona una voce per modificarla nell'editor. Oppure inseriscine uno
        da Zero.
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex h-full w-full flex-col items-center justify-around gap-2 rounded-lg text-[rgb(var(--clr-txt))]"
      >
        {/* RENDER LISTA ELEMENTI */}
        <div className="h-full w-full overflow-y-auto pb-2 text-sm xl:text-base">
          <header className="flex w-full items-center justify-between py-4 xl:p-1">
            <label
              htmlFor="tipoImprevisto"
              className="flex w-full items-center justify-around gap-1 xl:w-1/2 xl:justify-center xl:gap-2"
            >
              Lista da editare
              <select
                id="tipoImprevisto"
                ref={selectRef}
                onChange={handleSelectRef}
                className="w-1/2 self-center rounded-md border bg-[rgb(var(--clr-txt))] p-1 text-sm font-semibold text-[rgb(var(--clr-bg))] placeholder-[rgb(var(--clr-txt))] xl:w-fit dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="cessioni">Cessioni</option>
                <option value="acquisti">Acquisti</option>
                <option value="trofei">Trofei</option>
                <option value="trend">Trend Prestazioni</option>
                <option value="fine-camp">Risultati Campionato</option>
              </select>
            </label>
          </header>
          {listaFiltrata?.map((item) => (
            <div
              key={item.id} // Importante per le liste in React
              onClick={() => handleEditClick(item)} // Al click, imposta l'elemento in modifica
              className="group relative m-2 cursor-pointer rounded border border-[rgb(var(--clr-txt))] hover:bg-[rgb(var(--clr-btn)/.7)] xl:px-2 xl:py-4"
            >
              {selectRefState === "acquisti" ? (
                <>
                  <div className="grid grid-cols-2 items-center p-2 font-bold xl:grid-cols-4 xl:gap-2">
                    <span className="text-[rgb(var(--clr-ter))]">
                      {item.nomeUnder && `Overall ≥ ` + item.nomeUnder}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2 p-2 xl:grid-cols-4">
                    <span>Under 32</span>
                    <span>Over 32</span>
                    <span>Serie Minore Under 32</span>
                    <span>Serie Minore Over 32</span>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2 p-2 xl:grid-cols-4">
                    <span>{item.valoreUnder && item.valoreUnder}</span>
                    <span>{item.valoreOver && item.valoreOver}</span>
                    <span>
                      {item.valoreSerieMinore && item.valoreSerieMinore}
                    </span>
                    <span>
                      {item.valoreSerieMinoreOver && item.valoreSerieMinoreOver}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 items-center p-2 font-bold xl:grid-cols-2 xl:gap-2">
                    {item.tipo === "cessioni" && (
                      <span className="text-[rgb(var(--clr-ter))]">
                        {item.nome && `Overall ≥ ` + item.nome}
                      </span>
                    )}
                    {item.tipo !== "cessioni" && (
                      <span className="text-[rgb(var(--clr-ter))]">
                        {item.nome && item.nome}
                      </span>
                    )}
                    <span>{item.valore && item.valore + ` pt`}</span>
                  </div>
                </>
              )}
              <MdDeleteForever
                size={28}
                className="absolute right-0 top-1/2 me-0 h-full w-8 -translate-y-1/2 cursor-pointer transition-all group-hover:fill-red-600 hover:scale-125 xl:me-2"
                onClick={() => rmVoceDB(item.id)}
              />
              {/* Mostra altri dettagli dell'elemento */}
            </div>
          ))}
        </div>

        {/* EDITING ELEMENTO */}

        <div className="relative mt-4 h-full w-full border-t-2 border-t-[rgb(var(--clr-btn))] xl:m-0">
          {editingItem && (
            <strong className="absolute top-0 inline-block w-full text-center italic text-[rgb(var(--clr-ter))]">
              Fai doppio Click su ANNULLA per resettare i campi di modifica
            </strong>
          )}
          <h2 className="mt-2 h-fit text-center font-bold uppercase xl:p-4">
            {!editingItem ? "Inserisci" : "Modifica"} Bonus/Malus{" "}
            {selectRefState}
          </h2>
          <form
            onSubmit={handleSubmit(handleUpdateSubmit)}
            className="flex h-full w-full flex-col items-center justify-around rounded-md font-normal xl:justify-between"
          >
            {/* CESSIONI */}

            {selectRefState === "cessioni" && (
              <div className="grid h-2/3 w-full grid-rows-2 items-center justify-center gap-2 p-2 xl:grid-cols-2">
                <label className="my-1 flex w-full flex-col items-center gap-2 text-sm font-semibold xl:gap-4">
                  Valore ≥ di
                  {errors.nome && (
                    <span className="font-normal italic text-red-600">
                      Il campo "Valore ≥ di" è obbligatorio - min. 30 max 99
                    </span>
                  )}
                  <input
                    id="nome"
                    name="nome"
                    {...register("nome", { required: true, min: 30, max: 95 })}
                    min={30}
                    type="number"
                    placeholder="Valore ≥ di?"
                    className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                  />
                </label>
                <label className="my-1 flex w-full flex-col items-center gap-2 text-sm font-semibold xl:gap-4">
                  Punti
                  {errors.valore && (
                    <span className="font-normal italic text-red-600">
                      Il campo "Punti" è obbligatorio
                    </span>
                  )}
                  <input
                    {...register("valore", {
                      required: true,
                    })}
                    id="valore"
                    name="valore"
                    type="number"
                    placeholder="Punti?"
                    className="block self-start rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                  />
                </label>
              </div>
            )}

            {/* ACQUISTI */}

            {selectRefState === "acquisti" && (
              <section className="grid h-full w-full grid-rows-2 items-center gap-2 xl:grid-cols-4 xl:p-2">
                <div className="my-2 flex h-auto w-full flex-col xl:gap-2">
                  <label className="my-1 flex w-full flex-col items-center text-sm font-semibold xl:gap-4">
                    Valore Overall Under 32 ≥ di
                    {errors.nomeUnder && (
                      <span className="font-normal italic text-red-600">
                        Il campo "Valore ≥ di" è obbligatorio - min. 30 max 99
                      </span>
                    )}
                    <input
                      id="nomeUnder"
                      name="nomeUnder"
                      {...register("nomeUnder", {
                        required: true,
                        min: 30,
                        max: 95,
                      })}
                      min={30}
                      type="number"
                      placeholder="Valore ≥ di?"
                      className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                    />
                  </label>
                  <label className="my-1 flex w-full flex-col items-center text-sm font-semibold xl:gap-4">
                    Punti Under 32
                    {errors.valoreUnder && (
                      <span className="font-normal italic text-red-600">
                        Il campo "Punti" è obbligatorio
                      </span>
                    )}
                    <input
                      {...register("valoreUnder", {
                        required: true,
                      })}
                      id="valoreUnder"
                      name="valoreUnder"
                      type="number"
                      placeholder="Punti?"
                      className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                    />
                  </label>
                </div>
                <div className="my-2 flex h-auto w-full flex-col xl:gap-2">
                  <label className="my-1 flex w-full flex-col items-center text-sm font-semibold xl:gap-4">
                    Valore Overall Over 32 ≥ di
                    {errors.nomeOver && (
                      <span className="font-normal italic text-red-600">
                        Il campo "Valore ≥ di" è obbligatorio - min. 30 max 99
                      </span>
                    )}
                    <input
                      id="nomeOver"
                      name="nomeOver"
                      {...register("nomeOver", {
                        required: true,
                        min: 30,
                        max: 95,
                      })}
                      min={30}
                      type="number"
                      placeholder="Valore ≥ di?"
                      className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                    />
                  </label>
                  <label className="my-1 flex w-full flex-col items-center text-sm font-semibold xl:gap-4">
                    Punti Over 32
                    {errors.valoreOver && (
                      <span className="font-normal italic text-red-600">
                        Il campo "Punti" è obbligatorio
                      </span>
                    )}
                    <input
                      {...register("valoreOver", {
                        required: true,
                      })}
                      id="valoreOver"
                      name="valoreOver"
                      type="number"
                      placeholder="Punti?"
                      className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                    />
                  </label>
                </div>
                <div className="my-2 flex h-auto w-full flex-col xl:gap-2">
                  <label className="my-1 flex w-full flex-col items-center text-sm font-semibold xl:gap-4">
                    Valore Overall Serie Minore ≥ di
                    {errors.nomeSerieMinore && (
                      <span className="font-normal italic text-red-600">
                        Il campo "Valore ≥ di" è obbligatorio - min. 30 max 99
                      </span>
                    )}
                    <input
                      id="nomeSerieMinore"
                      name="nomeSerieMinore"
                      {...register("nomeSerieMinore", {
                        required: true,
                        min: 30,
                        max: 95,
                      })}
                      min={30}
                      type="number"
                      placeholder="Valore ≥ di?"
                      className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                    />
                  </label>
                  <label className="my-1 flex w-full flex-col items-center text-sm font-semibold xl:gap-4">
                    Punti Serie Minore
                    {errors.valoreSerieMinore && (
                      <span className="font-normal italic text-red-600">
                        Il campo "Punti" è obbligatorio
                      </span>
                    )}
                    <input
                      {...register("valoreSerieMinore", {
                        required: true,
                      })}
                      id="valoreSerieMinore"
                      name="valoreSerieMinore"
                      type="number"
                      placeholder="Punti?"
                      className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                    />
                  </label>
                </div>
                <div className="my-2 flex h-auto w-full flex-col xl:gap-2">
                  <label className="my-1 flex w-full flex-col items-center text-sm font-semibold xl:gap-4">
                    Valore Overall Serie Minore Over 32 ≥ di
                    {errors.nomeSerieMinoreOver && (
                      <span className="font-normal italic text-red-600">
                        Il campo "Valore ≥ di" è obbligatorio - min. 30 max 99
                      </span>
                    )}
                    <input
                      id="nomeSerieMinoreOver"
                      name="nomeSerieMinoreOver"
                      {...register("nomeSerieMinoreOver", {
                        required: true,
                        min: 30,
                        max: 95,
                      })}
                      min={30}
                      type="number"
                      placeholder="Valore ≥ di?"
                      className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                    />
                  </label>
                  <label className="my-1 flex w-full flex-col items-center text-sm font-semibold xl:gap-4">
                    Punti Serie Minore Over 32
                    {errors.valoreSerieMinoreOver && (
                      <span className="font-normal italic text-red-600">
                        Il campo "Punti" è obbligatorio
                      </span>
                    )}
                    <input
                      {...register("valoreSerieMinoreOver", {
                        required: true,
                      })}
                      id="valoreSerieMinoreOver"
                      name="valoreSerieMinoreOver"
                      type="number"
                      placeholder="Punti?"
                      className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                    />
                  </label>
                </div>
              </section>
            )}

            {/* TREND PRESTAZIONI */}

            {(selectRefState === "trend" ||
              selectRefState === "trofei" ||
              selectRefState === "fine-camp") && (
              <div className="grid h-2/3 w-full grid-rows-2 items-center justify-center gap-2 p-2 xl:grid-cols-2">
                <label className="my-1 flex w-full flex-col items-center gap-2 text-sm font-semibold xl:gap-4">
                  Nome
                  {errors.nome && (
                    <span className="font-normal italic text-red-600">
                      Il campo "Nome" è obbligatorio
                    </span>
                  )}
                  <input
                    id="nome"
                    name="nome"
                    {...register("nome", { required: true, maxLength: 60 })}
                    type="text"
                    placeholder="Nome del trend"
                    className="block rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                  />
                </label>
                <label className="my-1 flex w-full flex-col items-center gap-2 text-sm font-semibold xl:gap-4">
                  Punti
                  {errors.valore && (
                    <span className="font-normal italic text-red-600">
                      Il campo "Punti" è obbligatorio
                    </span>
                  )}
                  <input
                    {...register("valore", {
                      required: true,
                    })}
                    id="valore"
                    name="valore"
                    type="number"
                    placeholder="Punti?"
                    className="block self-start rounded bg-[rgb(var(--clr-txt))] p-1 text-center text-sm font-semibold uppercase text-[rgb(var(--clr-bg))] placeholder:normal-case placeholder:italic xl:self-center"
                  />
                </label>
              </div>
            )}

            {/* PULSANTI */}
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 xl:flex-row xl:gap-2">
              <button
                className="flex h-12 w-full flex-col items-center justify-center rounded-lg border-2 border-red-700 py-1 font-semibold hover:bg-red-700 xl:h-16 xl:w-1/3"
                type="button"
                onClick={handleCancelEdit}
              >
                Annulla
              </button>
              <button
                type="submit"
                className="flex h-12 w-full flex-col items-center justify-center rounded-lg border-2 border-[rgb(var(--clr-btn))] py-1 font-semibold hover:bg-[rgb(var(--clr-btn)/.7)] xl:h-16 xl:w-1/3"
              >
                Salva ed Invia
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
export default EditorSaldoPunti;
