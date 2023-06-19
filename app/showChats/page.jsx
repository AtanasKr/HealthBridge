"use client"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import LoadingComponent from '@components/LoadingComponent'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSession } from 'next-auth/react'

const showAppointments = () => {

    const { data: session, status } = useSession()
    const [chats, setChats] = useState(null);
    useEffect(() => {
        async function fetchChats() {
            const res = await fetch(`http://localhost:3000/api/getChats`)
            const chats = await res.json();
            let results = chats.filter(obj => {
                return (session?.user._id === obj.idFrom||session?.user._id === obj.idTo);
            });
        
            setChats(results);
        }

        fetchChats();
    }, [session])
    if (!chats) {
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
                    {chats.map((val) => {
                        let firstName;
                        let secondName;
                        let idForRedirect;
                        let forward;
                        if(session?.user._id===val.idFrom){
                            firstName = val.nameTo;
                            secondName = val.nameFrom;
                            idForRedirect = val.idTo;
                            forward = true;
                        }else{
                            firstName = val.nameFrom;
                            secondName = val.nameTo;
                            idForRedirect = val.idFrom;
                            forward = false;
                        }

                        return (
                            <Link href={`http://localhost:3000/chat/${idForRedirect}`}><ListItem key={1} alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb: "0.5em", pl: "5em" }}>
                                <ListItemText
                                    primary={firstName}
                                />
                                {forward&&<ArrowBackIosIcon sx={{position:"absolute", ml:"9em", mt:"0.2em"}} />}
                                {!forward&&<ArrowForwardIosIcon sx={{position:"absolute", ml:"9em", mt:"0.2em"}} />}
                                <ListItemText sx={{ position: "absolute", pl: "25em" }}
                                    primary={secondName}
                                />
                            </ListItem></Link>
                        )
                    })}
                </List>
            </Paper>
            {chats.length==0&&<Typography sx={{pr:"4em"}}>Нямате чатове</Typography>}
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