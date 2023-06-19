'use client'
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
import { useEffect, useState } from 'react';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Sidebar() {
    const [selectedCheckBox, setSelectedCheckBox] = useState("")
    const handleChange = (event) => {
        localStorage.setItem("sideBarButton", event.target.value);
    }

    useEffect(() => {
        async function refreshFunc() {
            setSelectedCheckBox(localStorage.getItem("sideBarButton"))
        }

        refreshFunc();
    }, [])

    return (
        <FormControl>
            <FormLabel sx={{ fontWeight: "1000", color: "black" }}>Категории</FormLabel>
            <RadioGroup
                name="radio-buttons-group"
                defaultValue={selectedCheckBox}
            >
                <FormControlLabel onChange={handleChange} value="all" control={<Radio size="small" />} label="Всички" />
                <FormControlLabel onChange={handleChange} value="surgeon" control={<Radio size="small" />} label="Хирург" />
                <FormControlLabel onChange={handleChange} value="cardiologist" control={<Radio size="small" />} label="Кардиолог" />
                <FormControlLabel onChange={handleChange} value="gynecologist" control={<Radio size="small" />} label="Гинеколог" />
                <FormControlLabel onChange={handleChange} value="dermatologist" control={<Radio size="small" />} label="Дерматолог" />
                <FormControlLabel onChange={handleChange} value="endocrinologist" control={<Radio size="small" />} label="Ендокринолог" />
                <FormControlLabel onChange={handleChange} value="pediatrician" control={<Radio size="small" />} label="Педиатър" />
                <FormControlLabel onChange={handleChange} value="firstcare" control={<Radio size="small" />} label="Първична грижа" />
                <FormControlLabel onChange={handleChange} value="eyecare" control={<Radio size="small" />} label="Очен лекар" />
                <FormControlLabel onChange={handleChange} value="dentist" control={<Radio size="small" />} label="Зъболекар" />
            </RadioGroup>
            <TextField id="other-input" label="Други..." variant="outlined" size="small" margin='normal' sx={{ width: "10em", height: "2em", mb: "2em" }} />
        </FormControl>
    );
}
