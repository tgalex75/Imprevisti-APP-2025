/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { GrPowerReset } from "react-icons/gr";
import { LuArrowUpWideNarrow, LuArrowDownWideNarrow } from "react-icons/lu";
import { IoMdTrendingDown, IoMdTrendingUp, IoMdPodium } from "react-icons/io";
import { GiTrophy, GiTrophyCup } from "react-icons/gi";
import { MdCreate } from "react-icons/md";
import DatiImprevistiContext from "../context/datiImprevisti";
import Spinner from "../Components/Spinner";

const SaldoPunti = () => {
  const [isOver32, setIsOver32] = useState(false);
  const [isSerieMinore, setIsSerieMinore] = useState(false);
  const isSerieMinoreOver = isOver32 && isSerieMinore;
  const [isLoading, setIsLoading] = useState(true); // Nuovo stato isLoading

  const { bonusMalus, saldoPunti, fetchSaldoPunti } = useContext(
    DatiImprevistiContext,
  );

    useEffect(() => {
    // Controlla se bonusMalus ha dati
    if (bonusMalus && bonusMalus.length > 0) {
      setIsLoading(false); // Imposta isLoading a false quando i dati sono disponibili
    } else if (bonusMalus === null || bonusMalus === undefined) {
      setIsLoading(true); // Mantieni isLoading a true se bonusMalus è null o undefined
    } else if (bonusMalus && bonusMalus.length === 0 && isLoading) {
        // Se bonusMalus è un array vuoto ma stavamo ancora caricando (es. primo render)
        // decidiamo se considerarlo "caricato" (array vuoto è uno stato valido)
        // o se aspettare ulteriormente (dipende dalla logica dell'app)
        // In questo caso, lo considero caricato.
        setIsLoading(false);
    }
  }, [bonusMalus, isLoading]); // Aggiungi isLoading alle dipendenze di useEffect

  if (isLoading) {
    return <Spinner />; // Mostra lo spinner se isLoading è true
  }

  // Se bonusMalus è un array vuoto dopo il caricamento e vuoi mostrare un messaggio specifico
  if (!isLoading && bonusMalus.length === 0) {
    return (
      <div className=" absolute text-3xl left-1/2 top-1/2 -translate-x-1/2 transform text-center">
        Nessun dato disponibile. Controlla l'Editor.
      </div>
    );
  }


  const { id, punti } = saldoPunti[0];

  const checkisOver = () => {
    setIsOver32(!isOver32);
  };
  const checkisSerieMinore = () => {
    setIsSerieMinore(!isSerieMinore);
  };

  const updateSaldoPunti = async (val) => {
    const { error } = await supabase
      .from("saldo-punti")
      .update({
        punti: punti + val,
      })
      .eq("id", id)
      .select();
    error && console.log("error: ", error);
    fetchSaldoPunti();
  };

  const resetPunti = async () => {
    const { error } = await supabase
      .from("saldo-punti")
      .update({ punti: 10 })
      .eq("id", id)
      .select();
    error && console.log("error: ", error);
    fetchSaldoPunti();
  };

  const bonusMalusStyle =
    "flex flex-col cursor-pointer text-center text-base p-2 border-none hover:border items-center justify-center rounded-xl hover:text-black hover:bg-[rgb(var(--clr-ter))]";

  const bonusCessioni = bonusMalus
    .filter((el) => el.tipo === "cessioni")
    .sort((a, b) => a.id - b.id);

  const mappedCessioni = bonusCessioni.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {"≥" + el.nome} +{el.valore}
    </div>
  ));

  const malusAcquisti = bonusMalus
    .filter((el) => el.tipo === "acquisti")
    .sort((a, b) => a.id - b.id);

  const mappedAcquisti = malusAcquisti.map((el) => (
    <div
      key={el.id}
      onClick={() =>
        isSerieMinoreOver
          ? updateSaldoPunti(el.valoreSerieMinoreOver)
          : updateSaldoPunti(
              isOver32
                ? el.valoreOver
                : isSerieMinore
                  ? el.valoreSerieMinore
                  : el.valoreUnder,
            )
      }
      className={bonusMalusStyle}
    >
      ≥
      {isSerieMinoreOver
        ? el.nomeSerieMinoreOver
        : isOver32
          ? el.nomeOver
          : isSerieMinore
            ? el.nomeSerieMinore
            : el.nomeUnder}{" "}
      {isSerieMinoreOver
        ? el.valoreSerieMinoreOver
        : isOver32
          ? el.valoreOver
          : isSerieMinore
            ? el.valoreSerieMinore
            : el.valoreUnder}
    </div>
  ));

  const bonusTrofei = bonusMalus
    .filter((el) => el.tipo === "trofei")
    .sort((a, b) => a.id - b.id);

  const mappedTrofei = bonusTrofei.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {el.nome} +{el.valore}
    </div>
  ));

  const trendPrestazioni = bonusMalus
    .filter((el) => el.tipo === "trend")
    .sort((a, b) => a.id - b.id);

  const mappedTrend = trendPrestazioni.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {el.nome} {el.valore > 0 ? `+${el.valore}` : el.valore}
    </div>
  ));

  const fineCampionato = bonusMalus
    .filter((el) => el.tipo === "fine-camp")
    .sort((a, b) => a.id - b.id);

  const mappedPiazzamento = fineCampionato.map((el) => (
    <div
      key={el.id}
      onClick={() => updateSaldoPunti(el.valore)}
      className={bonusMalusStyle}
    >
      {el.nome} +{el.valore}
    </div>
  ));

  return (
    <>
      <main
        id="saldo-punti"
        className="flex h-full w-full select-none flex-col items-center justify-between gap-2 bg-[rgb(var(--clr-bg))] py-4 font-semibold xl:font-bold"
      >
        <section
          id="saldoPunti"
          className="flex h-1/4 w-full flex-col items-center justify-around"
        >
          <h1 className="relative">Saldo Punti</h1>
          <Link to="/editor-saldo-punti">
            <MdCreate
              className="absolute left-2 mt-8 opacity-30 transition-all duration-500 hover:left-4 hover:opacity-100"
              size={40}
            />
          </Link>
          <h3 className="text-8xl font-black italic xl:text-7xl">{punti}</h3>
          <div className="absolute right-2 mt-12 flex flex-col items-center justify-around p-2">
            <GrPowerReset
              size={32}
              className="peer cursor-pointer hover:animate-spin hover:stroke-[rgb(var(--clr-btn))] active:scale-150"
              onClick={resetPunti}
            />
            <span className="invisible text-[rgb(var(--clr-btn))] transition-all duration-500 ease-in-out peer-hover:visible">
              Reset{" "}
            </span>
          </div>
        </section>

        {/* CESSIONI */}

        <section
          id="acquistiCessioni"
          className="flex h-1/4 w-full flex-col items-center gap-1 text-lg xl:h-1/4 xl:flex-row"
        >
          <div className="flex h-full w-full flex-col items-center justify-around rounded-xl border-2 border-[rgb(var(--clr-btn))] transition-all duration-300 ease-in-out hover:border-[rgb(var(--clr-txt))] hover:bg-[rgb(var(--clr-btn)/.7)] xl:w-1/2">
            <h2 className="inline-flex items-center text-xl xl:text-lg">
              Cessioni Mercato
              <LuArrowUpWideNarrow className="mx-3 inline-block" size={28} />
            </h2>
            <div
              className="grid h-auto w-full grid-cols-5 justify-center"
              style={{
                gridTemplateColumns: `repeat(${mappedCessioni.length}, minmax(0, 1fr))`,
              }}
            >
              {mappedCessioni}
            </div>

            {/* ACQUISTI */}
          </div>
          <div className="relative flex h-full w-full flex-col items-center justify-around rounded-xl border-2 border-[rgb(var(--clr-btn))] transition-all duration-300 ease-in-out hover:border-[rgb(var(--clr-txt))] hover:bg-[rgb(var(--clr-btn)/.7)] xl:w-1/2">
            <h2 className="inline-flex items-center text-xl xl:text-lg">
              Acquisti Mercato
              <LuArrowDownWideNarrow className="mx-3 inline-block" size={28} />
            </h2>
            <div
              className="grid h-auto w-full grid-cols-5 justify-center"
              style={{
                gridTemplateColumns: `repeat(${mappedAcquisti.length}, minmax(0, 1fr))`,
              }}
            >
              {mappedAcquisti}
            </div>
            {/* TOGGLE SERIE MINORE */}
            <div className="group absolute left-1 top-1 flex items-center gap-2 p-4 text-xs xl:p-2">
              <label
                htmlFor="switch-link"
                className={`cursor-pointer font-sans antialiased ${
                  isSerieMinore &&
                  "border-b-2 border-b-[rgb(var(--clr-prim))] text-[rgb(var(--clr-txt))]"
                }`}
              >
                Serie Minore<span>{isSerieMinore ? " " : "?"}</span>
              </label>
              <input
                id="switch-link"
                type="checkbox"
                checked={isSerieMinore}
                onChange={checkisSerieMinore}
                className="relative inline-block h-4 w-8 cursor-pointer appearance-none rounded-full before:absolute before:left-0 before:top-0 before:inline-block before:h-full before:w-full before:rounded-full before:bg-stone-400 before:transition-colors before:duration-200 before:ease-in after:absolute after:left-0 after:top-2/4 after:h-6 after:w-6 after:-translate-y-2/4 after:rounded-full after:border after:border-stone-500 after:bg-stone-600 after:transition-all after:duration-200 after:ease-in checked:before:bg-stone-200 checked:after:translate-x-1/2 checked:after:border-stone-200 disabled:cursor-not-allowed disabled:opacity-50 dark:checked:after:bg-[rgb(var(--clr-prim))]"
              />
            </div>
            {/* TOGGLE OVER 32 */}
            <div className="absolute right-1 top-1 flex items-center gap-2 p-4 text-xs xl:p-2">
              <label
                htmlFor="switch-link"
                className={`cursor-pointer font-sans antialiased ${
                  isOver32 &&
                  "border-b-2 border-b-[rgb(var(--clr-prim))] text-[rgb(var(--clr-txt))]"
                }`}
              >
                Over 32<span>{isOver32 ? " " : "?"}</span>
              </label>
              <input
                id="switch-link"
                type="checkbox"
                checked={isOver32}
                onChange={checkisOver}
                className="relative inline-block h-4 w-8 cursor-pointer appearance-none rounded-full before:absolute before:left-0 before:top-0 before:inline-block before:h-full before:w-full before:rounded-full before:bg-stone-400 before:transition-colors before:duration-200 before:ease-in after:absolute after:left-0 after:top-2/4 after:h-6 after:w-6 after:-translate-y-2/4 after:rounded-full after:border after:border-stone-500 after:bg-stone-600 after:transition-all after:duration-200 after:ease-in checked:before:bg-stone-200 checked:after:translate-x-1/2 checked:after:border-stone-200 disabled:cursor-not-allowed disabled:opacity-50 dark:checked:after:bg-[rgb(var(--clr-prim))]"
              />
            </div>
          </div>
        </section>

        {/* COMPETIZIONI */}

        <section
          id="trendPrestazioni"
          className="flex h-1/5 w-full flex-col items-center justify-around rounded-xl border-2 border-[rgb(var(--clr-btn))] p-1 text-lg transition-all duration-300 ease-in-out hover:border-[rgb(var(--clr-txt))] hover:bg-[rgb(var(--clr-btn)/.7)] xl:h-1/4"
        >
          <h2 className="inline-flex items-center gap-4 text-xl xl:text-lg">
            <IoMdTrendingDown size={28} />
            Trend delle Prestazioni
            <IoMdTrendingUp size={28} />
          </h2>
          <div
            className="grid h-auto w-full grid-cols-2 justify-center"
            style={{
              gridTemplateColumns: `repeat(${mappedTrend.length}, minmax(0, 1fr))`,
            }}
          >
            {mappedTrend}
          </div>
        </section>
        <section
          id="fineCampionato"
          className="flex h-1/4 w-full flex-col items-center justify-around rounded-xl border-2 border-[rgb(var(--clr-btn))] p-1 text-lg transition-all duration-300 ease-in-out hover:border-[rgb(var(--clr-txt))] hover:bg-[rgb(var(--clr-btn)/.7)]"
        >
          <h2 className="inline-flex items-center gap-4 text-xl xl:text-lg">
            <IoMdPodium size={28} />
            Risultati Campionato
            <IoMdPodium size={28} />
          </h2>
          <div
            className="grid h-auto w-full grid-cols-3 items-center justify-center xl:grid-cols-9"
            style={{
              gridTemplateColumns: `repeat(${mappedPiazzamento.length}, minmax(0, 1fr))`,
            }}
          >
            {mappedPiazzamento}
          </div>
        </section>
        <section
          id="bonusTrofei"
          className="flex h-1/4 w-full flex-col items-center justify-around rounded-xl border-2 border-[rgb(var(--clr-btn))] p-1 text-lg transition-all duration-300 ease-in-out hover:border-[rgb(var(--clr-txt))] hover:bg-[rgb(var(--clr-btn)/.7)]"
        >
          <h2 className="inline-flex items-center gap-4 text-xl xl:text-lg">
            <GiTrophyCup size={28} />
            Trofei Conquistati
            <GiTrophy size={28} />
          </h2>
          <div
            className="grid h-auto w-full grid-cols-5 justify-center"
            style={{
              gridTemplateColumns: `repeat(${mappedTrofei.length}, minmax(0, 1fr))`,
            }}
          >
            {mappedTrofei}
          </div>
        </section>
      </main>
    </>
  );
};

export default SaldoPunti;
