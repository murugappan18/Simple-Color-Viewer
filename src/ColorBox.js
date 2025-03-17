const ColorBox = ({color, hexValue, isDarkText}) => {
  return (
    <div
      className="color-box"
      style={{
        backgroundColor: color,
        color: isDarkText ? "#000" : "#FFF"
      }}
    >
      <p>{color ? color : "Empty Value"}</p>
      <p>{hexValue ? hexValue : null}</p>
    </div>
  );
}

export default ColorBox