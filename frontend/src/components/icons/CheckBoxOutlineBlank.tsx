import { FC } from 'react';
import { IconProps } from '../../types/IconProps';
import getIconClassName from '../../utils/functions/get-icon-classname';

const CheckBoxOutlineBlank: FC<IconProps> = ({
  height = 18,
  width = 18,
  color = '#000',
  hoverColor = '#808080',
  colorFromParent = false,
  className = ''
}) => {
  const finalClassName = getIconClassName(
    width,
    height,
    color,
    hoverColor,
    className,
    colorFromParent
  );
  //* ========================================================= JSX =========================================================
  return (
    <>
      <svg
        width={width}
        height={height}
        className={finalClassName}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
          className="fill-current"
        />
      </svg>
    </>
  );
};

export default CheckBoxOutlineBlank;
