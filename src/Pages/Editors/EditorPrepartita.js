import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteForever } from "react-icons/md";
import DatiImprevistiContext from "../../context/datiImprevisti";

const EditorPrepartita = () => {
  const { prepartita, fetchPrepartita } = useContext(DatiImprevistiContext);

  // Stato per memorizzare l'elemento attualmente in modifica (null se nessuno)
  const [editingItem, setEditingItem] = useState(null);

  const isListaVuota = prepartita.length < 1;

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

    const { error } = await supabase
      .from("prepartita")
      .upsert({
        id: isListaVuota ? uuidv4() : data.id,
        title: !data.isSpecial ? data.title : "IMPREVISTO SPECIALE",
        description: data.description,
        isImprev: data.isImprev,
        isSpecial: data.isSpecial,
        ultEstrazione: data.ultEstrazione,
        baseEstrazione: data.baseEstrazione,
        numbExtrPlayer: data.numbExtrPlayer,
        notaBene: data.notaBene,
        weight: data.weight,
      })
      .select();
    error && console.log(error);
    fetchPrepartita();
    // *** QUI FINISCE LA LOGICA DI AGGIORNAMENTO PER SUPABASE ***

    // Dopo l'aggiornamento, resettiamo lo stato di modifica per tornare alla lista
    setEditingItem(null);
  };

  // Gestore per annullare la modifica
  const handleCancelEdit = () => {
    setEditingItem(null);
    reset()
  };

  const rmVoceDB = async (element) => {
    const { error } = await supabase
      .from("prepartita")
      .delete()
      .eq("id", element);
    error && console.log(error);
    fetchPrepartita()
  };


  return (
    <section className="flex h-full w-full flex-col items-center overflow-y-auto p-2 font-semibold xl:overflow-y-hidden xl:font-bold">
      <h1 className="h-fit">Editor Prepartita</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex h-full w-full flex-col items-center justify-around gap-2 rounded-lg text-[rgb(var(--clr-txt))]"
      >
        {/* LISTA ELEMENTI */}
        <div className="h-full w-full overflow-y-auto pb-2">
          {prepartita?.map((item) => (
            <div
              key={item.id} // Importante per le liste in React
              onClick={() => handleEditClick(item)} // Al click, imposta l'elemento in modifica
              className="m-2 cursor-pointer border-[rgb(var(--clr-txt))] py-4 px-2 rounded hover:bg-[rgb(var(--clr-btn)/.7)] relative group"
            >
              <h3>{item.title}</h3>
              <p className="pe-2 xl:pe-8">{item.description}</p>
              <MdDeleteForever
                size={28}
                className="absolute right-0 top-1/2 me-0 xl:me-2 h-full w-8 -translate-y-1/2 cursor-pointer transition-all group-hover:fill-red-600 hover:scale-125"
                onClick={() => rmVoceDB(item.id)}
                />
              {/* Mostra altri dettagli dell'elemento */}
            </div>
          ))}
        </div>

        {/* EDITING ELEMENTO */}

        <div className="mt-4 h-full w-full border-t-2 border-t-[rgb(var(--clr-btn))] xl:m-0">
          <h2 className="h-fit text-center font-bold uppercase xl:p-4">
            {isListaVuota ? "LISTA VUOTA: Inserisci" : "Modifica"} Imprevisto
          </h2>
          <form
            onSubmit={handleSubmit(handleUpdateSubmit)}
            className="flex h-full w-full flex-col items-center justify-around rounded-md font-normal xl:justify-between"
          >
            <div className="flex h-2/3 w-full flex-col items-start justify-between gap-2 px-2 xl:flex-row">
              <label className="my-1 flex w-full flex-col items-start self-start text-sm font-semibold xl:gap-4">
                Titolo Imprevisto
                {errors.title && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "titolo" è obbligatorio - max 60 caratteri
                  </span>
                )}
                <input
                  name="title"
                  {...register("title", { required: true, maxLength: 60 })}
                  className="block w-2/3 self-start rounded p-1 text-sm font-semibold uppercase text-black placeholder:normal-case placeholder:italic"
                  placeholder="Titolo dell'imprevisto"
                />
              </label>
              <label className="my-1 flex w-full flex-col items-start self-start text-sm font-semibold xl:gap-4">
                Descrizione Imprevisto
                {errors.description && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "Descrizione" è obbligatorio
                  </span>
                )}
                <textarea
                  name="description"
                  {...register("description")}
                  rows={4}
                  id="description"
                  placeholder="Descrizione dell'imprevisto"
                  className="w-full rounded p-1 text-sm font-semibold text-black placeholder:italic"
                />
              </label>
              <label className="my-1 flex w-full flex-col self-start text-sm font-semibold xl:items-end xl:gap-4">
                Nota bene... compilare se è un caso particolare
                {errors.notaBene && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "Nota Bene" è errato
                  </span>
                )}
                <input
                  name="notaBene"
                  {...register("notaBene", { required: false })}
                  id="notaBene"
                  placeholder="Scrivi una nota"
                  className="block w-2/3 rounded p-1 text-sm font-semibold uppercase text-black placeholder:normal-case placeholder:italic xl:self-end"
                />
              </label>
            </div>
            <div className="flex h-1/3 w-full flex-col items-start justify-between px-2 xl:grid xl:grid-cols-2 xl:items-center xl:gap-4 xl:px-4">
              <label
                htmlFor="isImprev"
                className="my-1 flex w-full items-center justify-between xl:justify-start gap-2 text-sm font-semibold xl:ms-4 xl:self-start"
              >
                È un imprevisto?
                {errors.isImprev && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "È un imprevisto?" è obbligatorio
                  </span>
                )}
                <div className="ms-4 flex h-fit w-1/4 items-center justify-around px-4 xl:gap-2">
                  <label htmlFor="isImprevYES">Sì</label>
                  <input
                    {...register("isImprev", { required: true })}
                    id="isImprevYES"
                    name="isImprev"
                    type="radio"
                    value={true}
                    className="ms-2 h-4 w-4 rounded border-[rgb(var(--clr-txt))] text-[rgb(var(--clr-btn))] focus:ring-2 focus:ring-[rgb(var(--clr-btn))] md:m-0 dark:border-[rgb(var(--clr-txt))] dark:bg-[rgb(var(--clr-txt))] dark:ring-offset-[rgb(var(--clr-txt))] dark:focus:ring-[rgb(var(--clr-btn))]"
                  />
                  <label htmlFor="isImprevNO">No</label>
                  <input
                    {...register("isImprev", { required: true })}
                    id="isImprevNO"
                    name="isImprev"
                    type="radio"
                    value={false}
                    className="ms-2 h-4 w-4 rounded border-[rgb(var(--clr-txt))] text-[rgb(var(--clr-btn))] focus:ring-2 focus:ring-[rgb(var(--clr-btn))] md:m-0 dark:border-[rgb(var(--clr-txt))] dark:bg-[rgb(var(--clr-txt))] dark:ring-offset-[rgb(var(--clr-txt))] dark:focus:ring-[rgb(var(--clr-btn))]"
                  />
                </div>
              </label>
              <label
                htmlFor="isSpecial"
                className="my-1 flex w-full items-center justify-between xl:justify-start gap-2 text-sm font-semibold xl:ms-4 xl:self-start"
              >
                È un imprevisto SPECIALE?
                {errors.isSpecial && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "È un imprevisto SPECIALE?" è obbligatorio
                  </span>
                )}
                <div className="ms-4 flex h-fit w-1/4 items-center justify-around px-4 xl:gap-2">
                  <label htmlFor="isSpecialYES">Sì</label>
                  <input
                    {...register("isSpecial", { required: true })}
                    id="isSpecialYES"
                    name="isSpecial"
                    type="radio"
                    value={true}
                    className="ms-2 h-4 w-4 rounded border-[rgb(var(--clr-txt))] text-[rgb(var(--clr-btn))] focus:ring-2 focus:ring-[rgb(var(--clr-btn))] md:m-0 dark:border-[rgb(var(--clr-txt))] dark:bg-[rgb(var(--clr-txt))] dark:ring-offset-[rgb(var(--clr-txt))] dark:focus:ring-[rgb(var(--clr-btn))]"
                  />
                  <label htmlFor="isSpecialNO">No</label>
                  <input
                    {...register("isSpecial", { required: true })}
                    id="isSpecialNO"
                    name="isSpecial"
                    type="radio"
                    value={false}
                    className="ms-2 h-4 w-4 rounded border-[rgb(var(--clr-txt))] text-[rgb(var(--clr-btn))] focus:ring-2 focus:ring-[rgb(var(--clr-btn))] md:m-0 dark:border-[rgb(var(--clr-txt))] dark:bg-[rgb(var(--clr-txt))] dark:ring-offset-[rgb(var(--clr-txt))] dark:focus:ring-[rgb(var(--clr-btn))]"
                  />
                </div>
              </label>
              <label
                htmlFor="ultEstrazione"
                className="my-1 flex w-full items-center justify-between xl:justify-start gap-2 text-sm font-semibold xl:ms-4 xl:self-start"
              >
                Bisogna estrarre uno o più giocatori?
                {errors.ultEstrazione && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "estrazione giocatore" è obbligatorio
                  </span>
                )}
                <div className="ms-4 flex h-fit w-1/4 items-center justify-around px-4 xl:gap-2">
                  <label htmlFor="ultEstrazioneYES">Sì</label>
                  <input
                    {...register("ultEstrazione", { required: true })}
                    id="ultEstrazioneYES"
                    name="ultEstrazione"
                    type="radio"
                    value={true}
                    defaultChecked={editingItem?.ultEstrazione === true}
                    className="ms-2 h-4 w-4 rounded border-[rgb(var(--clr-txt))] text-[rgb(var(--clr-btn))] focus:ring-2 focus:ring-[rgb(var(--clr-btn))] md:m-0 dark:border-[rgb(var(--clr-txt))] dark:bg-[rgb(var(--clr-txt))] dark:ring-offset-[rgb(var(--clr-txt))] dark:focus:ring-[rgb(var(--clr-btn))]"
                  />
                  <label htmlFor="ultEstrazioneNO">No</label>
                  <input
                    {...register("ultEstrazione", { required: true })}
                    id="ultEstrazioneNO"
                    name="ultEstrazione"
                    type="radio"
                    value={false}
                    defaultChecked={editingItem?.ultEstrazione === false}
                    className="ms-2 h-4 w-4 rounded border-[rgb(var(--clr-txt))] text-[rgb(var(--clr-btn))] focus:ring-2 focus:ring-[rgb(var(--clr-btn))] md:m-0 dark:border-[rgb(var(--clr-txt))] dark:bg-[rgb(var(--clr-txt))] dark:ring-offset-[rgb(var(--clr-txt))] dark:focus:ring-[rgb(var(--clr-btn))]"
                  />
                </div>
              </label>
              <label
                htmlFor="numbExtrPlayer"
                className="my-1 flex w-full items-center justify-between xl:justify-start gap-2 text-sm font-semibold xl:ms-4 xl:self-start"
              >
                Quanti giocatori saranno estratti?
                {errors.numbExtrPlayer && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "Quanti Giocatori" è obbligatorio - Inserisci un
                    numero da 0 a 10
                  </span>
                )}
                <input
                  {...register("numbExtrPlayer", {
                    required: true,
                    min: 0,
                  })}
                  id="numbExtrPlayer"
                  name="numbExtrPlayer"
                  type="number"
                  placeholder="Quanti giocatori?"
                  className="ms-4 min-w-20 rounded p-1 text-sm font-semibold text-black placeholder:italic xl:w-48"
                />
              </label>
              <label
                htmlFor="baseEstrazione"
                className="my-1 flex w-full items-center justify-between xl:justify-start gap-2 text-sm font-semibold xl:ms-4 xl:self-start"
              >
                Su quanti giocatori effettuare l'estrazione?
                {errors.baseEstrazione && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "Su quanti giocatori?" è obbligatorio
                  </span>
                )}
                <input
                  {...register("baseEstrazione", {
                    required: true,
                    min: 0,
                    max: 40,
                  })}
                  id="baseEstrazione"
                  name="baseEstrazione"
                  type="number"
                  placeholder="11"
                  className="ms-4 min-w-20 rounded p-1 text-sm font-semibold text-black placeholder:italic xl:w-48"
                ></input>
              </label>
              <label
                htmlFor="weight"
                className="my-1 flex w-full items-center justify-between xl:justify-start gap-2 text-sm font-semibold xl:ms-4 xl:self-start"
              >
                Quale è il "peso" di questo imprevisto?
                {errors.weight && (
                  <span className="font-normal italic text-[rgb(var(--clr-txt))]">
                    Il campo "Peso Imprevisto" è obbligatorio
                  </span>
                )}
                <input
                  {...register("weight", {
                    required: true,
                  })}
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="Inserisci un numero"
                  className="ms-4 min-w-20 rounded p-1 text-sm font-semibold text-black placeholder:italic xl:w-48"
                ></input>
              </label>
            </div>
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
export default EditorPrepartita;
