import React, {useRef, useEffect} from 'react';
import colorNames from 'colornames';

const ColorInput = ({color, setColor, setHexValue, isDarkText, setIsDarkText}) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <input className="color-input"
            type="text" 
            ref={inputRef}
            placeholder="Enter a Color Name" 
            value={color}
            onChange={(e) => {
                setColor(e.target.value);
                setHexValue(colorNames(e.target.value));
            }} 
        />
        <button 
            type='button'
            onClick={() => {
              setIsDarkText(!isDarkText);
              inputRef.current.focus();
            }}
        >Toggle Text Color
        </button>
    </form>
  )
}

export default ColorInput