import { FC } from 'react';
import { IconProps } from '../../types/IconProps';
import getIconClassName from '../../utils/functions/get-icon-classname';

const DeleteIcon: FC<IconProps> = ({
  height = 14,
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
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5ZM1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6Z"
          className="fill-current"
        />
      </svg>
    </>
  );
};

export default DeleteIcon;
