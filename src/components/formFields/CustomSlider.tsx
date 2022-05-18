import { Slider } from '@material-ui/core';
import { Box, Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { Controller } from 'react-hook-form';


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

  

export  const CustomSlider: FC<TextFieldProps> = ({
    name,
    label,
    control,
    value,
    onBlur,
    onChange
  }) => {

  return (
            <Controller
                    name={name}
                    defaultValue=''
                    control={control}
                    render={({field: {onChange, value}, fieldState}) => (
                        <>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{mr: 2, backgroundColor: 'skyblue', p: 1.5, width: '1rem',}} > 0</Typography>
                        <Slider
                        valueLabelDisplay="auto"
                        aria-label="Default"
                        defaultValue={value}
                        aria-labelledby="input-slider"
                        onChange={(event: ChangeEvent<{}>, newValue: number | number[]) => {
                            onChange(newValue)
                        }}
                        min={0}
                        max={50}
                      />

                      <Typography sx={{ml: 2, backgroundColor: 'skyblue', p: 1.5, width: '1rem',}}>50</Typography>
                      
                      </Box>
                      {fieldState.error ? <Typography style={{color: '#d32f2f',fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontSize: '12px', marginLeft: '15px'}}>{fieldState.error.message}</Typography> : ''}

                      </>)}
            />)
}
