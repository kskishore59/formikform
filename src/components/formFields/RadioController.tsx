import { FC } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
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
    type: string;
    gender?: string;
    control: any;
    maxLength?: number;
    onBlur?: () => void;
    onChange?: (value: string | number) => void;
}

  

export  const CustomRadioCom: FC<TextFieldProps> = ({
    name,
    label,
    control,
    type,
    gender,
    onBlur,
    onChange
  }) => {

  return (
            <Controller
                    name={name}
                    defaultValue=''
                    control={control}
                    render={({field: {onChange}, fieldState}) => (
                    <Box >
                      <RadioGroup
                        onChange={onChange}
                        aria-labelledby="demo-radio-buttons-group-label"
                        id='gender'
                        row
                        defaultValue={gender}
                        sx={{ml: 1, mt: 1, mb:2}}
                      >
                        <FormControlLabel   value="female" control={<Radio  />} label="Female" />
                        <FormControlLabel    value="male" control={<Radio  />} label="Male" />
                        <FormControlLabel   value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  {fieldState.error ? <p style={{color: '#d32f2f',fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontSize: '12px', marginLeft: '15px'}}>{fieldState.error.message}</p> : ''}
                    </Box>
                    )}
            />)
}