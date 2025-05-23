/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useEffect } from "react";
//import { supabase } from "../supabaseClient";
import useFetchData from "../Hooks/useFetchData";

import {
  FaCalendarDays,
  FaPersonFalling,
  FaArrowTrendDown,
  FaFileInvoiceDollar,
  FaMoneyBill1Wave,
  FaArrowRightArrowLeft,
} from "react-icons/fa6";

const Home = () => {
  const { data, fetchRegistryList } = useFetchData("preferenze-immagini");

  useEffect(() => {
    fetchRegistryList();
  }, []);

  const dettagliImprevisti = [
    {
      id: 1,
      nome: "Prepartita",
      img: <FaPersonFalling size="80%" />,
      link: "/prepartita",
      bg: "--clr-sec",
    },
    {
      id: 2,
      nome: "Settimana",
      img: <FaCalendarDays size="80%" />,
      link: "/settimana",
      bg: "--clr-ter",
    },
    {
      id: 3,
      nome: "Serie Negativa",
      img: <FaArrowTrendDown size="80%" />,
      link: "/serie-negativa",
      bg: "--clr-sec",
    },
    {
      id: 4,
      nome: "Ingaggi",
      img: <FaFileInvoiceDollar size="80%" />,
      link: "/ingaggio",
      bg: "--clr-ter",
    },
    {
      id: 5,
      nome: "Mercato",
      img: <FaMoneyBill1Wave size="80%" />,
      link: "/offerte-mercato",
      bg: "--clr-sec",
    },
    {
      id: 6,
      nome: "Saldo Punti",
      img: <FaArrowRightArrowLeft className="rotate-90" size="80%" />,
      link: "/saldo-punti",
      bg: "--clr-ter",
    },
  ];

  const sorted = data.sort((a, b) => a.id - b.id).slice(0, 6);
  const listaCompleta = dettagliImprevisti.map((item, i) => ({
    ...item,
    url: sorted[i]?.url ?? null,
  }));

  const suffissoUrl =
    "http://localhost:8000/storage/v1/object/public/immagini/";

  return (
    <>
      <section
        className={`flex h-full w-full flex-wrap bg-[--clr-bg] font-bold text-[--clr-txt]`}
      >
        {listaCompleta.map((el) => (
          <div
            key={el.id}
            style={{
              zIndex: el.id,
            }}
            className="ease-[cubic-bezier(0.770, 0.000, 0.175, 1.000)] group h-1/3 grow basis-1/2 cursor-pointer items-center justify-start overflow-hidden transition-all duration-150 [box-shadow:-12px_0px_10px_-3px_rgba(2,2,2,0.5)] hover:text-[--clr-txt] xl:h-1/2 xl:basis-1/3"
          >
            <Link to={el.link} className="flex h-full bg-transparent">
              <h2
                style={{}}
                className={`flex rotate-180 items-center justify-center bg-[${el.bg}] px-4 text-center text-[.4rem] font-bold uppercase text-[--clr-txt] drop-shadow-lg transition-all [text-shadow:rgb(34,34,34)_0px_4px_4px] [writing-mode:vertical-lr] group-hover:bg-[--clr-btn] md:justify-start md:px-2 md:ps-8 md:text-[1.5dvw]`}
              >
                {el.nome}
              </h2>
              <div
                className={`flex w-full items-center justify-center bg-[--clr-bg] transition-all hover:bg-[--clr-sec]`}
                style={
                  el.url
                    ? {
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${suffissoUrl}${el.url})`,
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
