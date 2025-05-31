import { useState, useRef } from "react";
import ImageUploader from "../Funzioni/ImageUploader";

const ImgUploaderList = () => {
  const listaUploader = [
    { id: 1, nome: "Prepartita", urlName: "prepartita" },
    { id: 2, nome: "Settimana", urlName: "settimana" },
    { id: 3, nome: "Serie Negativa", urlName: "serie-negativa" },
    { id: 4, nome: "Ingaggi", urlName: "ingaggi" },
    { id: 5, nome: "Mercato", urlName: "mercato" },
    { id: 6, nome: "Saldo Punti", urlName: "saldo-punti" },
    { id: 7, nome: "Logo Squadra", urlName: "logo" },
  ];
  const mappedUploader = listaUploader.map((el) => (
    <ImageUploader key={el.id} id={el.id} nome={el.nome} urlName={el.urlName} />
  ));

  const selectRef = useRef(null);

  const [selectRefState, setSelectRefState] = useState("Prepartita");

  const handleSelectRef = () => {
    setSelectRefState(selectRef.current.value);
  };
  const filteredUploaderList = mappedUploader.filter(
    (item) => item.props.nome === selectRefState,
  );

  return (
    <section className="flex h-full gap-4 w-full items-center flex-col p-4">
        <h6 className="">Scegli per quale elemento vuoi caricare l'immagine</h6>
      <label className="gap-2" htmlFor="uploaderFilter">
        <select
          id="uploaderFilter"
          className="h-8 w-32 rounded bg-[rgb(var(--clr-txt))] p-2 text-[rgb(var(--clr-bg))]"
          ref={selectRef}
          onChange={handleSelectRef}
        >
          <option value="Prepartita">Prepartita</option>
          <option value="Settimana">Settimana</option>
          <option value="Serie Negativa">Serie Negativa</option>
          <option value="Ingaggi">Ingaggi</option>
          <option value="Mercato">Mercato</option>
          <option value="Saldo Punti">Saldo Punti</option>
          <option value="Logo Squadra">Logo Squadra</option>
        </select>
      </label>
      <div className="flex h-full w-full flex-col p-2">
        {filteredUploaderList}
      </div>
    </section>
  );
};

export default ImgUploaderList;
