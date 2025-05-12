import JerseySVGBg from "./JerseySVGBg";

const Tshirt = (props) => {
  const {
    keyId,
    numPlayer,
    colorGK,
    colorPl,
    colorNumGK,
    colorNumPl,
    extrPlayers,
  } = props;
  return (
    <div
      key={keyId}
      className={`relative flex flex-col items-center overflow-hidden rounded p-6 transition-all w-full ${extrPlayers > 2 ? "h-fit xl:h-1/2" : "h-full xl:h-3/5"}`}
    >
      <JerseySVGBg
        fillColor={numPlayer === 1 ? colorGK : colorPl}
        strokeColor={numPlayer === 1 ? colorPl : colorGK}
        className="stroke-2"
      />
      <span
        className={`absolute left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/3 font-['Anton'] ${extrPlayers > 2 ? "text-[4rem] xl:text-[5rem]" : "text-[5rem] xl:text-[6rem]"}`}
        style={{ color: numPlayer === 1 ? colorNumGK : colorNumPl }}
      >
        {numPlayer}
      </span>
    </div>
  );
};

export default Tshirt;
