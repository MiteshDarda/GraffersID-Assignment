import { FC } from 'react';
import { IconProps } from '../../types/IconProps';

const GreaterThanArrowIcon: FC<IconProps> = ({
  height = 18,
  width = 18,
  color = '#000',
  hoverColor = '#000',
  colorFromParent = false,
  className = ''
}) => {
  const iconStyles: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    color: colorFromParent ? 'inherit' : color,
    transition: 'color 0.2s ease' // Smooth transition for hover effect
  };

  // Handle hover effect with CSS
  const styleSheet = document.createElement('style');
  // Generate unique class name
  const uniqueClassName = `add-icon-${Math.random().toString(36).substring(7)}-${Date.now()}`;

  styleSheet.textContent = `
    .${uniqueClassName}:hover {
      color: ${hoverColor} !important;
    }
    .group:hover .${uniqueClassName} {
      color: ${hoverColor} !important;
    }
  `;
  document.head.appendChild(styleSheet);
  //* ========================================================= JSX =========================================================
  return (
    <>
      <svg
        width={width}
        height={height}
        style={iconStyles}
        className={`${uniqueClassName} ${className}`.trim()}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.23 20.23L8 22L18 12L8 2L6.23 3.77L14.46 12L6.23 20.23Z"
          className="fill-current"
        />
      </svg>
    </>
  );
};

export default GreaterThanArrowIcon;
