import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';

interface DropDownOptionProps {
  value: number;
  label: string;
}

interface DropDownProps {
  value: number;
  handleChange: any;
  options: DropDownOptionProps[];
}

const DropDown: FC<DropDownProps> = ({ value, handleChange, options }) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DropDown;
export type { DropDownOptionProps };
