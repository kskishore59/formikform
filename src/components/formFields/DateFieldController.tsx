import { FC } from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';


export interface TextFieldProps {
    name: string;
    label?: string;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
    password?: boolean;
    number?: boolean;
    enableDecimal?: boolean;
    value?: any;
    inputRef?: any;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    type?: string;
    control: any;
    maxLength?: number;
    onBlur?: () => void;
    onChange?: (value: string | number) => void;
}

  

export  const CustomDateCom: FC<TextFieldProps> = ({
    name,
    label,
    control,
    type,
    onBlur,
    onChange,
    fullWidth,
  }) => {

  return (
            <Controller
                    name={name}
                    defaultValue=''
                    control={control}
                    render={({field: {onChange, value}, fieldState}) => (
                        <LocalizationProvider dateAdapter={DateAdapter}>
                    <DesktopDatePicker
                        views={['year', 'month', 'day']}
                        label={label}
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        maxDate={new Date('2022-04-08')}
                        onChange={(newValue: Date | null) => {
                            onChange(newValue)
                        }}
                        renderInput={(params) => <TextField autoFocus fullWidth {...params} helperText={
                            fieldState.error ? fieldState.error.message : ''
                          } />}
                      />
                      </LocalizationProvider>)}
            />)
}

















