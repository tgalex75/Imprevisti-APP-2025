import { Sketch } from "@uiw/react-color";

const ColorPickerComponent = (props) => {
  const { defaultColor, updateFunc, testoColore } = props;

  return (
    <div className="flex flex-col items-center justify-around gap-2 p-2 font-extrabold">
      <h5>{testoColore}</h5>
      <div
        className="h-4 w-1/3 border border-[rgb(var(--clr-txt))]"
        style={{ backgroundColor: defaultColor }}
      ></div>
      <Sketch onChange={updateFunc} color={defaultColor} width={"80%"} />
    </div>
  );
};

export default ColorPickerComponent;
