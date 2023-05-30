'use client'
import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Sidebar() {
    return (
        <FormControl>
            <FormLabel sx={{ fontWeight: "1000", color: "black" }}>Категории</FormLabel>
            <RadioGroup
                defaultValue="surgeon"
                name="radio-buttons-group"
            >
                <FormControlLabel value="surgeon" control={<Radio size="small" />} label="Хирург" />
                <FormControlLabel value="cardiologist" control={<Radio size="small" />} label="Кардиолог" />
                <FormControlLabel value="gynecologist" control={<Radio size="small" />} label="Гинеколог" />
                <FormControlLabel value="dermatologist" control={<Radio size="small" />} label="Дерматолог" />
                <FormControlLabel value="endocrinologist" control={<Radio size="small" />} label="Ендокринолог" />
                <FormControlLabel value="pediatrician" control={<Radio size="small" />} label="Педиатър" />
                <FormControlLabel value="firstcare" control={<Radio size="small" />} label="Първична грижа" />
                <FormControlLabel value="eyecare" control={<Radio size="small" />} label="Очен лекар" />
                <FormControlLabel value="dentist" control={<Radio size="small" />} label="Зъболекар" />
            </RadioGroup>
            <TextField id="other-input" label="Други..." variant="outlined" size="small" margin='normal' sx={{ width: "10em", height: "2em", mb: "2em" }} />
        </FormControl>
    );
}
