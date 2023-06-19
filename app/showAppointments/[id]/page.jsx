"use client"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Button } from '@mui/material';
import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link';
import LoadingComponent from '@components/LoadingComponent'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSession } from 'next-auth/react'

const showAppointments = () => {

    const { data: session, status } = useSession()
    const [appointments, setAppointments] = useState(null);
    useEffect(() => {
        async function fetchAppointments() {
            const res = await fetch(`http://localhost:3000/api/getAppointments`)
            const appointments = await res.json();
            let results = appointments.filter(obj => {
                return (session?.user._id === obj.docId);
            });
            if (results.length==0) {
                results = appointments.filter(obj => {
                    return (session?.user._id === obj.patientId);
                });
            }
            setAppointments(results);
        }

        fetchAppointments();
    }, [session])
    if (!appointments) {
        return <LoadingComponent />
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ pt: "5em" }}
        >

            <Paper sx={{ maxHeight: { xl: "30em", md: "23em" }, overflow: 'auto', mr: "3em", boxShadow: "none", mt: "1em" }}>
                <List sx={{ width: '40em', bgcolor: 'background.paper', pr: "1em" }}>
                    {appointments.map((val) => {
                        return (
                            <ListItem key={1} alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb: "0.5em", pl: "5em" }}>
                                <ListItemText
                                    primary={`Пациент: ${val.patientName}`}
                                    secondary={
                                        <Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {`Доктор: ${val.docName}`}
                                            </Typography>
                                            {`—${val.docCat}`}
                                        </Fragment>
                                    }
                                />
                                <ListItemText sx={{ position: "absolute", pl: "19em" }}
                                    primary="Дата и час"
                                    secondary={
                                        <Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {`${val.appointmentDate} - ${val.appointmentTime}`}
                                            </Typography>
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
            {appointments.length==0&&<Typography sx={{pr:"4em"}}>Нямате записани часове</Typography>}
            <Link href="/"><Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, pl: "2em", pr: "2em", mr: "5em" }}
                startIcon={<ArrowBackIosIcon />}
            >
                Начало
            </Button></Link>

        </Grid>
    )
}

export default showAppointments