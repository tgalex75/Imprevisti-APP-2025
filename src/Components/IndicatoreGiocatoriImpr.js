import { useState, useEffect, useRef } from "react";
import {
  mySelect,
  tattiche,
  listaTattiche,
  extrTitolari,
} from "../Funzioni/schemi";
import { v4 as uuidv4 } from "uuid";

const IndicatoreGiocatoriImpr = (props) => {
  const { extractedPlayer } = props;

  const [schema, setSchema] = useState(() => {
    const saved = localStorage.getItem("schema");
    const initialValue = JSON.parse(saved);
    return initialValue || "4-4-2";
  });

  useEffect(() => {
    localStorage.setItem("schema", JSON.stringify(schema));
  }, [schema]);

  const selectRef = useRef(null);

  const getSchema = () => {
    setSchema(selectRef.current.value);
  };

  const extractedPlayerStyle = {
    backgroundColor: "orange",
    borderColor: "transparent",
    color: "black",
    fontWeight: 800,
  };

  const filteredTactics = listaTattiche.filter((item) => item.nome === schema);

  const tactics = (arr, start, end) => {
    return (
      <section key={Math.random()} className="flex items-center justify-center">
        <div className="flex items-center gap-6">
          {arr.slice(start, end).map((el) => (
            <div
              key={uuidv4()}
              className="my-2 flex w-2 items-center justify-center rounded-full border px-3 py-[.3rem] text-xs font-semibold text-[rgb(var(--clr-txt))] xl:px-4 xl:py-2"
              style={
                extractedPlayer?.find((item) => item === el.nome) &&
                extractedPlayerStyle
              }
            >
              {el.nome}
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center px-8 pb-4 lg:gap-2 xl:w-auto xl:justify-between xl:px-2">
      <h5 className="text-xs md:text-sm">{schema}</h5>
      <div className="flex w-full flex-col-reverse justify-center">
        {filteredTactics[0].formazione?.map((el, i, array) =>
          tactics(extrTitolari, el === 1 ? 0 : array[i - 1], el),
        )}
      </div>
      <div className="">
        {mySelect("Schema", selectRef, getSchema, tattiche, schema)}
      </div>
    </div>
  );
};

export default IndicatoreGiocatoriImpr;
