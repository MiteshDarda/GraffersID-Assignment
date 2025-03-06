import { useEffect, useState, ChangeEvent, FocusEvent, MouseEvent } from 'react';

interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  compulsory?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  required?: boolean;
}

const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  compulsory = false,
  size = 'sm',
  onBlur = () => {},
  onFocus = () => {},
  onChange,
  icon,
  required
}: InputProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const onClickHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.select();
  };

  const displayPlaceholder = compulsory ? `${placeholder} *` : placeholder;

  const sizeClasses = {
    sm: 'text-sm p-1.5',
    md: 'text-base p-2',
    lg: 'text-lg p-3',
    xl: 'text-xl p-4'
  };

  return (
    <div className="relative flex items-center w-full">
      <input
        required={required}
        onClick={onClickHandler}
        type={type}
        placeholder={displayPlaceholder}
        value={localValue}
        onChange={onChangeHandler}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`w-full border border-gray-200 focus:border-blue-400 focus:outline-none text-gray-700 hover:text-black hover:shadow transition-all duration-200 rounded-lg ${sizeClasses[size]} ${icon ? 'pr-10' : ''}`}
      />
      {icon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
};

export default Input;
