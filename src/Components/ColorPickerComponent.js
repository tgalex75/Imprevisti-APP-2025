import { Sketch } from '@uiw/react-color';

const ColorPickerComponent = (props) => {

  const {defaultColor, updateFunc, testoColore} = props

  return (
    <div className='flex flex-col items-center justify-around gap-2 p-2'>
      <h5 className="font-extrabold border-b-8 " style={{color: defaultColor, borderColor: defaultColor}}>{testoColore}</h5>
      <Sketch
        onChange={updateFunc}
        color={defaultColor}
        width={"80%"}
      />
    </div>
  );
}

export default ColorPickerComponent;