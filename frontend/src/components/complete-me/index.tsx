import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { FC, SyntheticEvent } from 'react';
import { Fragment } from 'react/jsx-runtime';

interface OptionsInterface {
  state: string;
  year?: number;
}

interface CompleteMeInterface {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  options: OptionsInterface[];
  loading: boolean;
  value: OptionsInterface | null;
  setValue: (value: OptionsInterface | null) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const CompleteMe: FC<CompleteMeInterface> = ({
  open,
  handleOpen,
  handleClose,
  options,
  loading,
  value,
  setValue,
  inputValue,
  setInputValue
}) => {
  return (
    <div className="border-gray-400 border rounded-sm">
      <Autocomplete
        sx={{ width: 300 }}
        open={open}
        value={value}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          event.preventDefault();
          setInputValue(newInputValue);
        }}
        onChange={(event: SyntheticEvent, newValue: OptionsInterface | null) => {
          event.preventDefault();
          setValue(newValue);
        }}
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(option, value) => option.state === value.state}
        getOptionLabel={(option) => option.state}
        options={options}
        loading={loading}
        popupIcon={null}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            hiddenLabel
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' }
              },
              '& .MuiInputBase-input': {
                outline: 'none'
              }
            }}
            placeholder="Search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              )
            }}
          />
        )}
      />
    </div>
  );
};

export default CompleteMe;
export type { OptionsInterface };
