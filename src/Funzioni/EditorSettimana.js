import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import DatiImprevistiContext from "../context/datiImprevisti";

const EditorSettimana = () => {
  const { settimana, fetchSettimana } = useContext(DatiImprevistiContext);

  // Stato per memorizzare l'elemento attualmente in modifica (null se nessuno)
  const [editingItem, setEditingItem] = useState(null);

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
    console.log("ID dell'elemento da aggiornare:", editingItem.id);

    const { error } = await supabase
      .from("settimana")
      .update({
        titolo: data.titolo,
        descrizione: data.descrizione,
        ultEstrazione: data.ultEstrazione,
        qtGiocatori: data.qtGiocatori,
        titolariRosa: data.titolariRosa,
      })
      .eq("id", data.id)
      .select();
    error && console.log(error);
    fetchSettimana();

    // *** QUI FINISCE LA LOGICA DI AGGIORNAMENTO PER SUPABASE ***

    // Dopo l'aggiornamento, resettiamo lo stato di modifica per tornare alla lista
    setEditingItem(null);
  };

  // Gestore per annullare la modifica
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <section className="flex h-full w-full flex-col items-center p-2 overflow-y-auto xl:overflow-y-hidden font-semibold xl:font-bold">
      <h1 className="h-fit">Editor Imprevisti Speciali</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex h-full w-full flex-col items-center justify-around rounded-lg bg-black/50 gap-2 text-[--clr-txt]"
      >
        {/* LISTA ELEMENTI */}
        <div className="h-full w-full overflow-y-auto pb-2">
          {settimana?.map((item) => (
            <div
              key={item.id} // Importante per le liste in React
              onClick={() => handleEditClick(item)} // Al click, imposta l'elemento in modifica
              className="m-2 cursor-pointer border-[--clr-txt] p-2 hover:bg-[--clr-btn]"
            >
              <h3>Titolo: {item.titolo}</h3>
              <p>Descrizione: {item.descrizione}</p>
              {/* Mostra altri dettagli dell'elemento */}
            </div>
          ))}
        </div>

        {/* EDITING ELEMENTO */}

        <div className="h-full w-full border-t-2 border-t-[--clr-btn] mt-4 xl:m-0">
            <h2 className="h-fit text-center font-bold uppercase xl:p-4">
              Modifica Imprevisto
            </h2>
          <form
            onSubmit={handleSubmit(handleUpdateSubmit)}
            className="flex h-full w-full flex-col items-center justify-around rounded-md font-normal xl:justify-between"
          >
            <div className="flex h-2/3 w-full flex-col items-start justify-between gap-2 px-2 xl:flex-row">
              <label className="my-1 flex w-full flex-col items-start xl:gap-4 self-start text-sm font-semibold">
                Titolo Imprevisto
                {errors.titolo && (
                  <span className="font-normal italic text-[--clr-ter]">
                    Il campo "Titolo" è obbligatorio - max 50 caratteri
                  </span>
                )}
                <input
                  name="titolo"
                  {...register("titolo", { required: true, maxLength: 60 })}
                  className="block w-2/3 self-start rounded p-1 text-sm font-semibold uppercase text-black placeholder:normal-case placeholder:italic"
                  placeholder="Titolo dell'imprevisto"
                />
              </label>
              <label className="my-1 flex w-full flex-col items-start xl:gap-4 self-start text-sm font-semibold">
                Descrizione Imprevisto
                {errors.descrizione && (
                  <span className="font-normal italic text-[--clr-ter]">
                    Il campo "Descrizione" è obbligatorio
                  </span>
                )}
                <textarea
                  name="descrizione"
                  {...register("descrizione", { required: true })}
                  rows={4}
                  id="descrizione"
                  placeholder="Descrizione dell'imprevisto"
                  className="w-full rounded p-1 text-sm font-semibold text-black placeholder:italic"
                />
              </label>
            </div>
            <div className="flex h-1/3 w-full flex-col items-start justify-between xl:gap-2 px-2 xl:flex-row">
              <label
                htmlFor="ultEstrazione"
                className="my-1 xl:ms-4 flex w-full items-center gap-2 justify-between xl:self-start text-sm font-semibold "
              >
                Bisogna estrarre uno o più giocatori?
                {errors.ultEstrazione && (
                  <span className="font-normal italic text-[--clr-ter]">
                    Il campo "estrazione giocatore" è obbligatorio
                  </span>
                )}
                <div className="px-4 w-1/4 h-fit flex items-center justify-around xl:gap-2 ms-4">
                  <label htmlFor="ultEstrazioneYES">Sì</label>
                  <input
                    {...register("ultEstrazione", { required: true })}
                    id="ultEstrazioneYES"
                    name="ultEstrazione"
                    type="radio"
                    value={true}
                    className="ms-2 h-4 w-4 rounded border-[--clr-txt] text-[--clr-btn] focus:ring-2 focus:ring-[--clr-btn] md:m-0 dark:border-[--clr-txt] dark:bg-[--clr-txt] dark:ring-offset-[--clr-txt] dark:focus:ring-[--clr-btn]"
                  />
                  <label htmlFor="ultEstrazioneNO">No</label>
                  <input
                    {...register("ultEstrazione", { required: true })}
                    id="ultEstrazioneNO"
                    name="ultEstrazione"
                    type="radio"
                    value={false}
                    className="ms-2 h-4 w-4 rounded border-[--clr-txt] text-[--clr-btn] focus:ring-2 focus:ring-[--clr-btn] md:m-0 dark:border-[--clr-txt] dark:bg-[--clr-txt] dark:ring-offset-[--clr-txt] dark:focus:ring-[--clr-btn]"
                  />
                </div>
              </label>
              <label
                htmlFor="qtGiocatori"
                className="my-1 xl:ms-4 flex w-full items-center gap-2 justify-between xl:self-start text-sm font-semibold"
              >
                Quanti giocatori saranno estratti?
                {errors.qtGiocatori && (
                  <span className="font-normal italic text-[--clr-ter]">
                    Il campo "Quanti Giocatori" è obbligatorio - Inserisci un
                    numero da 0 a 10
                  </span>
                )}
                <input
                  {...register("qtGiocatori", {
                    required: true,
                    min: 0,
                  })}
                  id="qtGiocatori"
                  name="qtGiocatori"
                  type="number"
                  placeholder="Quanti giocatori?"
                  className="ms-4 min-w-20 xl:w-48 rounded p-1 text-sm font-semibold text-black placeholder:italic"
                />
              </label>
              <label
                htmlFor="qtGiocatori"
                className="my-1 xl:ms-4 flex w-full items-center gap-2 justify-between xl:self-start text-sm font-semibold"
              >
                Su quanti giocatori effettuare l'estrazione?
                {errors.titolariRosa && (
                  <span className="font-normal italic text-[--clr-ter]">
                    Il campo "Su quanti giocatori?" è obbligatorio
                  </span>
                )}
                <input
                  {...register("titolariRosa", {
                    required: true,
                    min: 11,
                    max: 40,
                  })}
                  id="titolariRosa"
                  name="titolariRosa"
                  type="number"
                  placeholder="11"
                  className="ms-4 min-w-20 xl:w-48 rounded p-1 text-sm font-semibold text-black placeholder:italic"
                ></input>
              </label>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 xl:gap-2 xl:flex-row">
              <button
                className="h-12 w-full flex flex-col items-center justify-center rounded-lg border-2 border-red-700 py-1 font-semibold hover:bg-red-700 xl:h-16 xl:w-1/3"
                type="button"
                onClick={handleCancelEdit}
              >
                Annulla
              </button>
              <button
                type="submit"
                className="h-12 w-full flex flex-col items-center justify-center rounded-lg border-2 border-[--clr-btn] py-1 font-semibold hover:bg-[--clr-btn] xl:h-16 xl:w-1/3"
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
export default EditorSettimana;
