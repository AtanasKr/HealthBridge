"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Toolbar, Typography } from '@mui/material';
import Link from "next/link"

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const currentUser = true;

    // const handleOpenUserMenu = (event) => {
    //   setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = (e) => {
        e.preventDefault();
        logout();
        window.location.reload()
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
                        src={"/assets/images/Main-logo.png"}
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

                    </Box>

                    <Box sx={{
                        flexGrow: 1,
                        display: {
                            xs: 'none',
                            md: 'flex', paddingLeft: "30em"
                        }
                    }}>
                        <Link href="/signin"><Button
                            key={"Вход"}
                            sx={{ my: 2, color: 'black' }}>
                            {"Вход"}
                        </Button></Link>

                        <Link href="/register"><Button
                            key={"Регистрация"}
                            sx={{ my: 2, color: 'black' }}>
                            {"Регистрация"}
                        </Button></Link>

                    </Box>

                </Toolbar>

            </Container>

        </AppBar>
    );
}
export default Navbar;