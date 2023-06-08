"use client"
import React from 'react'
import { useEffect } from 'react'
import Sidebar from "@components/Sidebar"
import Navbar from '@components/Navbar'
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DoctorList from '@components/DoctorList'

const ConsultPage = () => {
  const [searchArray, setSearchArray] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);

  const [selectedCheckBox, setSelectedCheckBox] = React.useState("all")
  const handleChangeRadio = (event) => {
    setSelectedCheckBox(event.target.value)
  }

  const handleChange = (event, value) => setSelectedOption(value);

  useEffect(() => {
    async function fetchDoctors() {

      let doctors
      const res = await fetch(`http://localhost:3000/api/consult`)
      doctors = await res.json();

      doctors.map((val) => {
        setSearchArray(searchArray => [...searchArray, { label: val.username }]);
      })
    }

    fetchDoctors();
  }, [])
  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ pt: { xl: "6em", md: "2em" }, textAlign: "center", pl: "3em" }}>
        <Grid item xs={3} md={2} sx={{ border: "solid", borderRadius: "30px" }}>
          <FormControl>
            <FormLabel sx={{ fontWeight: "1000", color: "black" }}>Категории</FormLabel>
            <RadioGroup
              name="radio-buttons-group"
              defaultValue={"all"}
            >
              <FormControlLabel onChange={handleChangeRadio} value="all" control={<Radio size="small" />} label="Всички" />
              <FormControlLabel onChange={handleChangeRadio} value="хирург" control={<Radio size="small" />} label="Хирург" />
              <FormControlLabel onChange={handleChangeRadio} value="кардиолог" control={<Radio size="small" />} label="Кардиолог" />
              <FormControlLabel onChange={handleChangeRadio} value="гиниколог" control={<Radio size="small" />} label="Гинеколог" />
              <FormControlLabel onChange={handleChangeRadio} value="дерматолог" control={<Radio size="small" />} label="Дерматолог" />
              <FormControlLabel onChange={handleChangeRadio} value="ендокринолог" control={<Radio size="small" />} label="Ендокринолог" />
              <FormControlLabel onChange={handleChangeRadio} value="педиатър" control={<Radio size="small" />} label="Педиатър" />
              <FormControlLabel onChange={handleChangeRadio} value="пътвична грижа" control={<Radio size="small" />} label="Първична грижа" />
              <FormControlLabel onChange={handleChangeRadio} value="очен лекар" control={<Radio size="small" />} label="Очен лекар" />
              <FormControlLabel onChange={handleChangeRadio} value="зъболекар" control={<Radio size="small" />} label="Зъболекар" />
            </RadioGroup>
            <TextField id="other-input" label="Други..." variant="outlined" size="small" margin='normal' sx={{ width: "10em", height: "2em", mb: "2em" }} />
          </FormControl>
        </Grid>
        <Grid item xs={9} md={10}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={searchArray}
            sx={{ width: "auto", pr: "3em" }}
            onChange={handleChange}
            onSubmit={handleChange}
            renderInput={(params) => <TextField {...params} label="Търси..." />}
          />
          <DoctorList searchWord={selectedOption} selectedButton={selectedCheckBox} />
        </Grid>
      </Grid>
    </>
  )
}

export default ConsultPage