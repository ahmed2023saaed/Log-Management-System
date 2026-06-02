function Icon({ name, fill = 0, size = 22, color, style: s = {} }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill},'wght' 400,'GRAD' 0,'opsz' ${size}`,
        color,
        lineHeight: 1,
        ...s,
      }}
    >
      {name}
    </span>
  );
}

export default Icon;