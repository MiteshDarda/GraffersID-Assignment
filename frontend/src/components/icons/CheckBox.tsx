import { FC } from 'react';
import { IconProps } from '../../types/IconProps';
import getIconClassName from '../../utils/functions/get-icon-classname';

const CheckBox: FC<IconProps> = ({
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
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          opacity="0.3"
          d="M5 19H19V5H5V19ZM7.41 11.6L9.99 14.18L16.58 7.59L17.99 9L9.99 17L6 13.01L7.41 11.6Z"
          className="fill-current"
        />
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17.99 9L16.58 7.58L9.99 14.17L7.41 11.6L5.99 13.01L9.99 17L17.99 9Z"
          className="fill-current"
        />
      </svg>
    </>
  );
};

export default CheckBox;
