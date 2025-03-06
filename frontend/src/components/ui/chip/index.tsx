import { FC } from 'react';

interface ChipProps {
  label?: string;
  color?: 'green' | 'red' | 'blue' | 'yellow';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const Chip: FC<ChipProps> = ({ label = '', color = 'green', size = 'medium', onClick }) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg border font-medium transition-colors';

  const sizeStyles = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base'
  };

  const colorStyles = {
    green: 'bg-success-light text-success-dark hover:bg-success',
    red: 'bg-danger-light text-white hover:bg-danger-dark',
    blue: 'bg-primary-100 text-primary-400 hover:bg-primary-200',
    yellow: 'bg-warning-100 text-primary-400 hover:bg-warning-200'
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${colorStyles[color]}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
      role={onClick ? 'button' : 'status'}>
      {label}
    </div>
  );
};

export default Chip;
