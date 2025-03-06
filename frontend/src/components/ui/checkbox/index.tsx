import { FC, useEffect, useState } from 'react';
import { CheckBoxIcon, CheckBoxOutlineBlankIcon } from '../../icons';

interface CheckboxProps {
  isChecked?: boolean;
  onClick?: (e: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Checkbox: FC<CheckboxProps> = ({
  isChecked = false,
  onClick = () => {},
  label,
  disabled = false,
  size = 'md'
}) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  // Size mappings for the checkbox and text
  const sizeClasses = {
    sm: {
      checkbox: 'w-4 h-4',
      text: 'text-xs',
      gap: 'gap-1.5'
    },
    md: {
      checkbox: 'w-5 h-5',
      text: 'text-sm',
      gap: 'gap-2'
    },
    lg: {
      checkbox: 'w-6 h-6',
      text: 'text-base',
      gap: 'gap-2.5'
    },
    xl: {
      checkbox: 'w-8 h-8',
      text: 'text-lg',
      gap: 'gap-3'
    }
  };

  return (
    <label
      className={`inline-flex items-center ${sizeClasses[size].gap} cursor-pointer select-none`}>
      <div
        className={`
          ${sizeClasses[size].checkbox} flex items-center justify-center
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}
        `}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) {
            const newChecked = !checked;
            setChecked(newChecked);
            onClick(newChecked);
          }
        }}>
        {checked ? (
          <CheckBoxIcon className="text-primary-500 w-full h-full" />
        ) : (
          <CheckBoxOutlineBlankIcon className="text-gray-300 w-full h-full" />
        )}
      </div>
      {label && (
        <span
          className={`${sizeClasses[size].text} ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
