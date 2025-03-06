/**
 * @description EditIcon component
 * @param {height} height - number: height of the icon in px
 * @param {width} width - number: width of the icon in px
 * @param {color} color - string: color of the icon
 * @param {colorFromParent} colorFromParent - boolean: if true, the icon will inherit the color from the parent
 * @param {hoverColor} hoverColor - string: color of the icon on hover
 * @param {className} className - string: additional classes
 * @returns {React.FC}
 */
export interface IconProps {
  height?: number;
  width?: number;
  color?: string;
  hoverColor?: string;
  colorFromParent?: boolean;
  className?: string;
}
