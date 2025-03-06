import { FC } from 'react';
import { IconProps } from '../../types/IconProps';
import getIconClassName from '../../utils/functions/get-icon-classname';

const EditIcon: FC<IconProps> = ({
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
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          opacity="0.3"
          d="M2 15.0796V15.9996H2.92L11.98 6.93956L11.06 6.01956L2 15.0796Z"
          className="fill-current"
        />
        <path
          d="M0 14.2496V17.9996H3.75L14.81 6.93957L11.06 3.18958L0 14.2496ZM2.92 15.9996H2V15.0796L11.06 6.01958L11.98 6.93957L2.92 15.9996Z"
          className="fill-current"
        />
        <path
          d="M17.71 2.62957L15.37 0.28957C14.98 -0.10043 14.35 -0.10043 13.96 0.28957L12.13 2.11957L15.88 5.86957L17.71 4.03957C18.1 3.64957 18.1 3.01957 17.71 2.62957Z"
          className="fill-current"
        />
      </svg>
    </>
  );
};

export default EditIcon;
