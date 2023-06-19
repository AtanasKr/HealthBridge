"use client"
import { Autocomplete, Avatar, Box, Button, Container, CssBaseline, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const bookAppointment = (ctx) => {
    const theme = createTheme();

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("")
    const [err, setErr] = useState("");

    const router = useRouter()

    const { data: session, status } = useSession()

    const [doctorHolder, setDoctorHolder] = useState(null);
    let doctor

    useEffect(() => {
        async function fetchDoctor() {

            const res = await fetch(`http://localhost:3000/api/doctor/${ctx.params.id}`)
            doctor = await res.json();
            setDoctorHolder(doctor)

        }

        fetchDoctor();
    }, [])


    const handleChange = (event, value) => setTime(value);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!date || !time) {
            setErr("Моля попълнете всички полета!");
            return;
        }

        try {
            const docId = ctx.params.id;
            const patientId = session.user._id;
            const docName = doctorHolder[0].username;
            const docCat = doctorHolder[0].category;
            const patientName = session.user.username;
            const appointmentDate = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
            const appointmentTime = time.label;
            const res = await fetch(`http://localhost:3000/api/appointment`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                }, method: 'POST',
                body: JSON.stringify({ docId, patientId, docName, docCat, patientName, appointmentDate, appointmentTime })
            });


            if (!res.ok) {
                throw new Error("Error occured")
            }

            router.push(`/showAppointments/${patientId}`)

        } catch (error) {
            setErr(error)
        }

    }

    const hourArray = [
        { label: '9:00 AM' },
        { label: '9:30 AM' },
        { label: '10:00 AM' },
        { label: '10:30 AM' },
        { label: '11:00 AM' },
        { label: '11:30 AM' },
        { label: '12:00 AM' },
        { label: '12:30 AM' },
        { label: '1:00 PM' },
        { label: '1:30 PM' },
        { label: '2:00 PM' },
        { label: '2:30 PM' },
        { label: '3:00 PM' },
        { label: '3:30 PM' },
        { label: '4:00 PM' },
        { label: '4:30 PM' },
        { label: '5:00 PM' },
        { label: '5:30 PM' },
        { label: '6:00 PM' }

    ];
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: "12em",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Запазване на час
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={hourArray}
                            onChange={handleChange}
                            onSubmit={handleChange}
                            sx={{ width: "20em" }}
                            renderInput={(params) => <TextField {...params} label="Час на преглед..." />}
                        />
                        <Typography component="h1" variant="h5" style={{ textAlign: 'center' }} sx={{ pt: "1em" }}>
                            Дата
                        </Typography>
                        <Box sx={{ pl: "4.5em", pt: "1em" }}>
                            <DatePicker selected={date} onChange={(date) => setDate(date)} />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            style={{ border: '2px solid' }}
                            sx={{
                                mt: 4, mb: 2, bgcolor: 'white', color: "Black", '&:hover': {
                                    backgroundColor: 'lightgrey',
                                    boxShadow: 'none',
                                },
                            }}

                        >
                            Запази
                        </Button>
                    </Box>
                    <Link href="/"><Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, pl: "3em", pr: "3em" }}
                        startIcon={<ArrowBackIosIcon />}
                    >
                        Начало
                    </Button></Link>
                    {err && <Typography sx={{ color: "red" }}>{err}</Typography>}
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default bookAppointment