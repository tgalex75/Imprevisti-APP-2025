export const listaTattiche = [
  { nome: "4-4-2", formazione: [1, 5, 9, 11] },
  { nome: "4-2-1-3", formazione: [1, 5, 7, 8, 11] },
  { nome: "4-2-3-1", formazione: [1, 5, 7, 10, 11] },
  { nome: "4-3-1-2", formazione: [1, 5, 8, 9, 11] },
  { nome: "4-3-2-1", formazione: [1, 5, 8, 10, 11] },
  { nome: "4-3-3", formazione: [1, 5, 8, 11] },
  { nome: "3-5-2", formazione: [1, 4, 9, 11] },
  { nome: "3-4-1-2", formazione: [1, 4, 8, 9, 11] },
  { nome: "3-4-2-1", formazione: [1, 4, 8, 10, 11] },
  { nome: "3-4-3", formazione: [1, 4, 8, 11] },
  { nome: "5-3-2", formazione: [1, 6, 9, 11] },
  { nome: "5-2-1-2", formazione: [1, 6, 8, 9, 11] },
];

export const tattiche = listaTattiche?.map((el) => el.nome);

export const mySelect = (labelText, ref, func, arr, defaultVal) => {
  return (
    <div className="flex gap-1 flex-col">
      <label
        htmlFor="tattica"
        className="block text-xs md:text-sm xl:text-xs text-center xl:text-start font-medium text-[rgb(var(--clr-txt))]"
      >
        {labelText}
      </label>
      <select
        className="text-xs md:text-sm block w-28 lg:w-48 rounded-md border border-[rgb(var(--clr-txt))] p-1 lg:p-2 font-semibold bg-[rgb(var(--clr-txt))] text-[rgb(var(--clr-bg))] shadow-sm"
        name="tattica"
        ref={ref}
        onChange={func}
        defaultValue={defaultVal}
      >
        {arr?.map((el, i) => {
          return (
            <option key={i} value={el}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

let titolari = arrayRange(1, 11, 1);
let interaRosa = arrayRange(1, 30, 1);

export const extrTitolari = titolari?.map((el) => {
  return { id: el, nome: el };
});
export const extrRosa = interaRosa?.map((el) => {
  return { id: el, nome: el };
});

export const numbers = (suQtGiocatori) => {
  return (suQtGiocatori === 11 ? extrTitolari : extrRosa).map(
    (player) => player.id,
  );
}