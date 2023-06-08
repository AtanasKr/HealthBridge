"use client"
import React from 'react'
import { useEffect } from 'react'
import Sidebar from "@components/Sidebar"
import Navbar from '@components/Navbar'
import { Grid } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DoctorList from '@components/DoctorList'

const ConsultPage = () => {
  const [searchArray, setSearchArray] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);

const handleChange = (event, value) => setSelectedOption(value);

  useEffect(() => {
    async function fetchDoctors() {

      let doctors
      const res = await fetch(`http://localhost:3000/api/consult`)
      doctors = await res.json();

      doctors.map((val) => {
        setSearchArray(searchArray => [...searchArray, {label:val.username}]);
      })
    }

    fetchDoctors();
  }, [])
  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ pt: { xl: "6em", md: "2em" }, textAlign: "center", pl: "3em" }}>
        <Grid item xs={3} md={2} sx={{ border: "solid", borderRadius: "30px" }}>
          <Sidebar />
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
          <DoctorList searchWord = {selectedOption} />
        </Grid>
      </Grid>
    </>
  )
}

export default ConsultPage