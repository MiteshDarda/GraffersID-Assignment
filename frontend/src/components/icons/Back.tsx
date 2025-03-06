import { FC } from 'react';
import { IconProps } from '../../types/IconProps';

const BackIcon: FC<IconProps> = ({
  height = 18,
  width = 18,
  color = '#000',
  hoverColor = '#808080',
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
          d="M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.59L6.83 13H21V11Z"
          className="fill-current"
        />
      </svg>
    </>
  );
};

export default BackIcon;
