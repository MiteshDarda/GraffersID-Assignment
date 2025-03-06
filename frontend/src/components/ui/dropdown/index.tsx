import { useEffect, useState } from 'react';
import { ArrowDownFilledIcon } from '../../icons';

interface DropdownProps<T> {
  options: T[];
  placeholder?: string;
  onChange?: (value: T) => void;
  defaultValue?: T | null;
  renderOption?: (option: T) => string | number;
}

const Dropdown = <T extends string | number>({
  options,
  placeholder = 'Select an option',
  onChange = () => {},
  defaultValue = null,
  renderOption = (option: T) => String(option)
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleSelect = (option: T): void => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="relative w-64">
      {/* Dropdown button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full px-4 py-2 text-left bg-white border rounded-sm shadow-sm 
                   hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500
                   flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}>
        <span className={`${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
          {selectedOption ? renderOption(selectedOption) : placeholder}
        </span>
        <ArrowDownFilledIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute w-full mt-1 bg-white border rounded-sm shadow-lg z-10"
          role="listbox">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option, index) => (
              <li
                key={index}
                role="option"
                aria-selected={selectedOption === option}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-900
                         hover:text-blue-600 transition-colors duration-150"
                onClick={() => handleSelect(option)}>
                {renderOption(option)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
