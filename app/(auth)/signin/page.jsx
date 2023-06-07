"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      HealthBridge
      {" " + new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })

  const router = useRouter();
  
  const handleChange = (event) => {
    setInputs(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Validation checking
    if(inputs.password==='' || inputs.email===''){
      console.log("Моля полълнете всички полета");
      return
    }

    if(inputs.password.length<6){
      console.log("Паролата трябва да съдържа поне 6 символа!");
      return
    }

    try {
      const email = inputs.email;
      const password = inputs.password
      const res = await signIn('credentials', {email, password, redirect: false})

      if(res?.error==null){
        router.push("/")
      }else{
        console.log("Error occured while logging")
      }
      
    } catch (err) {
        console.log(err)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "3em",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 4, bgcolor: '#00A3FF', width: "4em", height: "4em" }}>
            <LoginIcon sx={{ width: "2em", height: "2em" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Имейл"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Парола"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              style={{ border: '2px solid' }}
              sx={{
                mt: 3, mb: 2, bgcolor: 'white', color: "Black", '&:hover': {
                  backgroundColor: 'lightgrey',
                  boxShadow: 'none',
                },
              }}

            >
              Вход
            </Button>
            <Grid container>
              <Grid item xs>
                Забравена парола?
              </Grid>
              <Grid item>
                Нямате акаунт? Регистрация
              </Grid>
            </Grid>
          </Box>
          <Link href="/"><Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, pl: "3em", pr: "3em" }}
            startIcon={<ArrowBackIosIcon />}
          >
            Начало
          </Button></Link>
          {/* <Typography sx={{color:"red"}}></Typography> */}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default SignIn