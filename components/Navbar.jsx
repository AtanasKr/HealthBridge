"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Toolbar, Typography } from '@mui/material';
import Link from "next/link"
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';

function Navbar() {

    const { data: session } = useSession();
    let username = null
    if(session){
        username = session.user.username;
    }

    return (
        <AppBar position="static"
            sx={{
                backgroundColor: "white",
                border: 1, borderColor: "black",
                paddingBottom: "1em",
                paddingTop: "1em"
            }}>

            <Container maxWidth="xl">

                <Toolbar disableGutters>

                    <Link href="/"><Box
                        component="img"
                        sx={{
                            height: "2em",
                            paddingRight: "4em",
                            paddingBottom: "0.3em"
                        }}
                        alt="Main-logo"
                        src={"/assets/images/Main-Logo.png"}
                    /></Link>

                    <Box sx={{
                        flexGrow: 1,
                        display: {
                            xs: 'none',
                            md: 'flex'
                        }
                    }}>
                        <Link href="/consult"><Button
                            key={"Консултация"}
                            sx={{ my: 2, color: 'black' }}>
                            {"Консултация"}
                        </Button></Link>

                        <Link href="/diagnose"><Button
                            key={"Самодиагностика"}
                            sx={{ my: 2, color: 'black' }}>
                            {"Самодиагностика"}
                        </Button></Link>

                        {session?.user &&<Link href={`/showAppointments/${session.user._id}`}><Button
                            key={"Записани часове"}
                            sx={{ my: 2, color: 'black' }}>
                            {"Записани часове"}
                        </Button></Link>}

                    </Box>

                    {!session?.user && <Box sx={{
                        flexGrow: 1,
                        display: {
                            xs: 'none',
                            md: 'flex', paddingLeft: "30em"
                        }
                    }}>
                        <Button
                            key={"Вход"}
                            sx={{ my: 2, color: 'black' }}
                            onClick={() => { signIn() }}>
                            {"Вход"}
                        </Button>

                        <Link href="/register"><Button
                            key={"Регистрация"}
                            sx={{ my: 2, color: 'black' }}>
                            {"Регистрация"}
                        </Button></Link>

                    </Box>}

                    {session?.user && <Box sx={{
                        flexGrow: 1,
                        display: {
                            xs: 'none',
                            md: 'flex', paddingLeft: "15em"
                        }
                    }}>
                        <Avatar sx={{ mt: "0.6em", mr: "1em" }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Button
                            key={username}
                            sx={{ my: 2, color: 'black' }}>
                            {username}
                        </Button>
                        <Button
                            key={"Изход"}
                            sx={{ my: 2, color: 'black' }}
                            onClick={() => { signOut() }}>
                            {"Изход"}
                        </Button>

                    </Box>}

                </Toolbar>

            </Container>

        </AppBar>
    );
}
export default Navbar;