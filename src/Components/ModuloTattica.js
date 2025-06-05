const ModuloTattica = (props) => {
  const { arr, start, end, giocatoreNum, func, placeholder, val } = props;

  return (
    <div className="flex items-center justify-center gap-2">
      {arr?.slice(start, end).map((el) => {
        return (
          <div
            key={el}
            className={`flex flex-col items-center ${
              end - start > 3 && "first:mb-4 last:mb-4"
            }`}
          >
            <label
              htmlFor={`p${el}`}
              className="md:text-lg block text-xs font-semibold text-[rgb(var(--clr-txt))]"
            >
              {giocatoreNum} {el}
            </label>
            <select
              id={`p${el}`}
              name={`p${el.nome}`}
              onChange={func}
              className="my-2 w-12 rounded-lg border-2 border-transparent bg-[rgb(var(--clr-prim))] p-2 text-sm font-semibold text-[rgb(var(--clr-txt))] hover:border-[rgb(var(--clr-txt))] md:w-44 md:text-md"
            >
              <option value="">{placeholder}</option>
              {val.map((num) => (
                <option key={num} value={num} className="text-xl">
                  {num}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default ModuloTattica;
