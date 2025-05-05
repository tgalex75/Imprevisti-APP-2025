import { Sketch } from '@uiw/react-color';

const ColorPickerComponent = (props) => {

  const {defaultColor, updateFunc} = props

  return (
    <div className='flex flex-col items-center justify-around gap-4 p-4 border-2'>
      <h2>Scegli il colore</h2>

      <Sketch
        onChange={updateFunc}
        color={defaultColor}
      />

      <div className='w-3/4 h-24 border rounded-lg' style={{backgroundColor: defaultColor}}></div>

    </div>
  );
}

export default ColorPickerComponent;