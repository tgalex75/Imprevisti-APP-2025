/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { Link } from "react-router-dom";
import DatiImprevistiContext from "../context/datiImprevisti";
//import Spinner from "../Components/Spinner";
import {
  FaCalendarDays,
  FaPersonFalling,
  FaArrowTrendDown,
  FaFileInvoiceDollar,
  FaMoneyBill1Wave,
  FaScaleBalanced,
  FaArrowRightArrowLeft,
  FaListCheck,
} from "react-icons/fa6";
import WelcomeModal from "../Components/WelcomeModal";

const Home = () => {
  const { preferenzeImmagini: data } = useContext(DatiImprevistiContext);

  const dettagliImprevisti = [
    {
      id: 1,
      nome: "Prepartita",
      img: <FaPersonFalling size="80%" />,
      link: "/prepartita",
    },
    {
      id: 2,
      nome: "Settimana",
      img: <FaCalendarDays size="80%" />,
      link: "/settimana",
    },
    {
      id: 3,
      nome: "Serie Negativa",
      img: <FaArrowTrendDown size="80%" />,
      link: "/serie-negativa",
    },
    {
      id: 4,
      nome: "Ingaggi",
      img: <FaFileInvoiceDollar size="80%" />,
      link: "/ingaggio",
    },
    {
      id: 5,
      nome: "Mercato",
      img: <FaMoneyBill1Wave size="80%" />,
      link: "/offerte-mercato",
    },
    {
      id: 6,
      nome: "Media Overall",
      img: <FaScaleBalanced size="80%" />,
      link: "/media-overall",
    },
    {
      id: 7,
      nome: "Saldo Punti",
      img: <FaArrowRightArrowLeft className="rotate-90" size="80%" />,
      link: "/saldo-punti",
    },
    {
      id: 8,
      nome: "Editor Imprevisti",
      img: <FaListCheck size="80%" />,
      link: "/editor-imprevisti",
    },
  ];

  const sorted = data?.sort((a, b) => a.id - b.id).slice(0, 8) ?? [];
  const listaCompleta = dettagliImprevisti?.map((item, i) => ({
    ...item,
    url: sorted[i]?.url ? URL.createObjectURL(sorted[i].url) : null,
  }));

  // if (!dbReady || data === undefined) {
  //   return <Spinner />; // Mostra lo spinner se dbReady non è true
  // }

  return (
    <>
      <WelcomeModal />
      <section
        id="home"
        className={`flex h-full w-full flex-wrap overflow-hidden bg-[rgb(var(--clr-bg)/.5)] font-bold text-[rgb(var(--clr-txt))]`}
      >
        {listaCompleta?.map((el) => (
          <div
            key={el.id}
            style={{
              zIndex: el.id,
            }}
            className="ease-[cubic-bezier(0.770, 0.000, 0.175, 1.000)] group relative h-1/4 grow basis-1/2 cursor-pointer items-center justify-start overflow-hidden border-2 border-[rgb(var(--clr-txt)/.5)] transition-all duration-150 hover:border-[rgb(var(--clr-txt))] hover:text-[rgb(var(--clr-txt))] xl:h-1/2 xl:basis-1/4 xl:border-none xl:[box-shadow:-12px_0px_10px_-3px_rgba(2,2,2,0.5)]"
          >
            <Link
              to={el.link}
              className="flex h-full flex-col bg-transparent xl:flex-row"
            >
              <h2 className="flex items-center justify-center bg-[rgb(var(--clr-prim))] p-2 text-center text-[.4rem] font-bold uppercase text-[rgb(var(--clr-txt))] transition-all group-hover:bg-[rgb(var(--clr-btn)/.7)] md:justify-start md:px-2 md:ps-10 md:text-[1.5dvw] xl:rotate-180 xl:px-4 xl:drop-shadow-lg xl:[text-shadow:rgb(34,34,34)_0px_4px_4px] xl:[writing-mode:vertical-lr]">
                {el.nome}
              </h2>

              <div
                id="overlay"
                className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[rgb(var(--clr-bg)/.5)] transition-all duration-500 group-hover:bg-transparent"
              ></div>

              <div
                className={`flex h-full w-full items-center justify-center text-7xl transition-all duration-300 ease-out group-hover:bg-[rgb(var(--clr-sec))]`}
                style={
                  el.url
                    ? {
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${el.url})`,
                      }
                    : {}
                }
              >
                {!el.url && el.img}
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
