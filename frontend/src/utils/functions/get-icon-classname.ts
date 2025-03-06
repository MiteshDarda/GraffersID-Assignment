const getIconClassName = (
  width: number,
  height: number,
  color: string,
  hoverColor: string,
  className: string,
  colorFromParent: boolean
) => {
  let finalClassName = `w-[${width}px] h-[${height}px] `;

  finalClassName += colorFromParent
    ? 'text-inherit'
    : ` fill-[${color}] hover:fill-[${hoverColor}] group-hover:fill-[${hoverColor}] text-[${color}] group-hover:text-[${hoverColor}] hover:text-[${hoverColor}] `;

  finalClassName += ` ${className} `;

  return finalClassName;
};

export default getIconClassName;
