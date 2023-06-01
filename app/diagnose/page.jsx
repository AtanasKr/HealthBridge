'use client'
import Navbar from '@components/Navbar'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DoneIcon from '@mui/icons-material/Done';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(43, 124, 176) 0%, rgb(31, 163, 236) 50%, rgb(28, 167, 242) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(43, 124, 176) 0%, rgb(31, 163, 236) 50%, rgb(28, 167, 242) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(43, 124, 176) 0%, rgb(31, 163, 236) 50%, rgb(28, 167, 242) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(43, 124, 176) 0%, rgb(31, 163, 236) 50%, rgb(28, 167, 242) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsAccessibilityIcon />,
        2: <GroupAddIcon />,
        3: <FormatListNumberedRtlIcon />,
        4: <DoneIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Пол', 'Години', 'Симптоми', 'Диагноза'];

const Diagnose = () => {

    const [stepCount, setStepCount] = useState(0);

    return (
        <div>
            <Navbar />
            <Stack sx={{ width: '100%', pt: "3em" }} spacing={4}>
                <Stepper alternativeLabel activeStep={stepCount} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                pt={"4em"}>
                {stepCount == 0 && <Card sx={{ maxWidth: 800, height: "20em", textAlign: "center", backgroundImage: "linear-gradient(#00A3FF, #859CA9)" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                            Какъв е вашия пол?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ color: "white" }}>
                            Имаме нужда от информация за вашият пол за да изчислим по-правилно диагнозата ви.
                        </Typography>
                    </CardContent>
                    <FormControl sx={{ pt: "2em", color: "white" }}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="male"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="male" control={<Radio sx={{ color: "white", '&.Mui-checked': { color: "white", }, }} />} label="Мъж" />
                            <FormControlLabel value="female" control={<Radio sx={{ color: "white", '&.Mui-checked': { color: "white", }, }} />} label="Жена" />
                        </RadioGroup>
                    </FormControl>
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        pt={"2em"}>
                        <CardActions>
                            <Button size="small" sx={{ color: "white" }} onClick={() => setStepCount(stepCount + 1)}>Напред {">"} </Button>
                        </CardActions>
                    </Grid>
                </Card>}
                {stepCount == 1 && <Card sx={{ maxWidth: 800, height: "20em", textAlign: "center", backgroundImage: "linear-gradient(#00A3FF, #859CA9)" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                            На колко години сте?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ color: "white" }}>
                            Имаме нужда от информация за вашата възраст за да квалифицираме по-добре възможните диагнози.
                        </Typography>
                    </CardContent>
                    <TextField id="standard-basic" variant="standard" sx={{ pt: "2em" }} />
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        pt={"2em"}>
                        <CardActions>
                            <Button size="small" sx={{ color: "white" }} onClick={() => setStepCount(stepCount - 1)}>{"<"} Назад</Button>
                            <Button size="small" sx={{ color: "white" }} onClick={() => setStepCount(stepCount + 1)}>Напред {">"} </Button>
                        </CardActions>
                    </Grid>
                </Card>}
                {stepCount == 2 && <Card sx={{ maxWidth: 800, height: "20em", textAlign: "center", backgroundImage: "linear-gradient(#00A3FF, #859CA9)" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                            Въведете вашите симптоми?
                        </Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Симптоми..." />}
                        />
                    </CardContent>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Тест" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="Тест2" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        pt={"2em"}>
                        <CardActions>
                            <Button size="small" sx={{ color: "white" }} onClick={() => setStepCount(stepCount - 1)}>{"<"} Назад</Button>
                            <Button size="small" sx={{ color: "white" }} onClick={() => setStepCount(stepCount + 1)}>Напред {">"} </Button>
                        </CardActions>
                    </Grid>
                </Card>}
                {stepCount == 3 && <Card sx={{ maxWidth: 800, height: "20em", textAlign: "center", backgroundImage: "linear-gradient(#00A3FF, #859CA9)" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                            Подредба на възможни диагнози.
                        </Typography>
                    </CardContent>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Тест" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="Тест2" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        pt={"2em"}>
                        <CardActions>
                            <Button size="small" sx={{ color: "white" }} onClick={() => setStepCount(stepCount - 1)}>{"<"} Назад</Button>
                        </CardActions>
                    </Grid>
                </Card>}
            </Grid>
        </div>
    )
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
];

export default Diagnose