import { ButtonProps } from '../../../../types/ButtonProps';
import Spinner from '../../spinner';

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  width,
  height,
  leftIcon,
  rightIcon,
  isLoading = false,
  isDisabled = false,
  onClick,
  fullWidth = false,
  rounded = false
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

  const variants = {
    transparent: 'bg-transparent text-gray-600 hover:text-black focus-visible:ring-gray-400',
    primary:
      'text-white bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus-visible:ring-blue-600',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
    success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600',
    ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400',
    outline: 'border-2 border-gray-200 hover:bg-gray-100 focus-visible:ring-gray-400'
  };

  const sizes = {
    xs: 'h-6 px-2 text-xs',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg'
  };

  const getStyleValue = (value: string | number | undefined): string | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  const styles = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    rounded ? 'rounded-full' : 'rounded-sm',
    className
  ].join(' ');

  const buttonStyle = {
    width: getStyleValue(width),
    height: getStyleValue(height)
  };

  return (
    <button
      type={type}
      className={styles}
      style={buttonStyle}
      disabled={isDisabled || isLoading}
      onClick={onClick}>
      {isLoading && <Spinner />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
