"use client"
import {useState} from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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

export default function Register() {
  const [statusMsg, setStatusMsg] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    category: "",
    price:"",
    description:""
  })

  const [selectedCheckBox, setSelectedCheckBox] = useState("")

  const handleChange = (event) => {
    if (event.target.name !== "patient" && event.target.name !== "doctor") {
      setInputs(prev => ({ ...prev, [event.target.name]: event.target.value }))
    } else {
      setSelectedCheckBox(event.target.name)
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    //validation checking
    if (inputs.email == "" || inputs.username == "" || inputs.password == "" || inputs.password2 == "") {
      setStatusMsg("Моля попълнете всички полета!")
      return
    }

    if (inputs.password !== inputs.password2) {
      setStatusMsg("Паролите трябва да са еднакви!")
      return
    }

    if (inputs.password.lenght < 6) {
      setStatusMsg("Паролата трябва да бъде поне 6 символа!")
      return
    }
    
    if(selectedCheckBox=="doctor"&&inputs.category==""){
      setStatusMsg("Моля въведете вашата лекарска категория!")
      return
    }

    try {
      const username = inputs.username;
      const email = inputs.email;
      const password = inputs.password;
      const role = selectedCheckBox;
      const category = inputs.category.toLowerCase();
      const price = inputs.price;
      const description = inputs.description;
      const res = await fetch('http://localhost:3000/api/register', {
        headers: {
          'Content-Type': 'applicatiopn/json'
        },
        method: 'POST',
        body: JSON.stringify({ username, email, password, role, category, price, description })
      })

      if (res.ok) {
        setStatusMsg("Успешно създаване на акаунт!")
        signIn();
        return
      } else {
        console.log("Error registering user");
      }
    } catch (err) {
      setStatusMsg(err)
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
            <HowToRegIcon sx={{ width: "2em", height: "2em" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
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
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Име"
              name="username"
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
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Повторете парола"
              type="password"
              id="password2"
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Записвате се като?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="doctor" name="doctor" onChange={handleChange} control={<Radio />} label="Доктор" />
                <FormControlLabel value="patient" name="patient" onChange={handleChange} control={<Radio />} label="Пациент" />
              </RadioGroup>
            </FormControl>
            {selectedCheckBox=="doctor"&&<TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="category"
              label="Категория"
              type="text"
              id="category"
            />}
            {selectedCheckBox=="doctor"&&<TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="price"
              label="Цена за консултация"
              type="number"
              id="price"
            />}
            {selectedCheckBox=="doctor"&&<TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="description"
              label="Описание за вас"
              type="text"
              id="description"
            />}
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
              Регистрация
            </Button>
            <Grid container>
              <Grid item>
              <Link href="/signin">Вече имате акаунт? Влезте</Link>
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
          {statusMsg&&(statusMsg!="Успешно създаване на акаунт!")&&<Typography sx={{color:"red"}}>{statusMsg}</Typography>}
          {statusMsg&&(statusMsg=="Успешно създаване на акаунт!")&&<Typography sx={{color:"green"}}>{statusMsg}</Typography>}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}