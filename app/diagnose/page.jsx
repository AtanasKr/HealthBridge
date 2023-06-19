'use client'
import Navbar from '@components/Navbar'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
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
    const [symList, setSymList] = useState([]);
    const [searchSym, setSearchSym] = useState("");
    const [diagnoseList, setDiagnoseList] = useState([]);

    const handleChange = (event, value) => setSearchSym(value);

    const handleClear = () => {
        setSymList([]);
    };

    const handleClearDiagnose = () => {
        setDiagnoseList([]);
        setStepCount(stepCount - 1)
        setSymList[[]]
    };


    const handleSubmit = (event) => {
        let contains = false;
        if (symList.some(e => e.label === searchSym.label)) {
            contains = true;
        }
        if (!contains) {
            setSymList(symList => [...symList, searchSym]);
        }
    }

    const getUnique = () => {
        let countVar = 0;
        if (symList.some(e => e.label === "обриви")) {
            countVar = countVar + 1;
        }
        if (symList.some(e => e.label === "сърбеж")) {
            countVar = countVar + 1;
        }
        if (symList.some(e => e.label === "температура")) {
            countVar = countVar + 1;
        }

        let countEarInfect = 0;
        if (symList.some(e => e.label === "болки в ушите")) {
            countEarInfect = countEarInfect + 1;
        }
        if (symList.some(e => e.label === "секрет от ушите")) {
            countEarInfect = countEarInfect + 1;
        }
        if (symList.some(e => e.label === "загуба на слух")) {
            countEarInfect = countEarInfect + 1;
        }

        if (countEarInfect == 3) {
            setDiagnoseList(diagnoseList => [...diagnoseList, { label: "ушна инфекция" }]);
        } else if (countVar == 3) {
            setDiagnoseList(diagnoseList => [...diagnoseList, { label: "варицела" }]);
        }

        setStepCount(stepCount + 1)
    }

    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }
    useEffect(() => {
        async function fetchDiagnoses() {
            const res = await fetch(`http://localhost:3000/api/diagnose`)
            const diagnoses = await res.json();
            symList.map((val) => {
                diagnoses.map((val2) => {
                    if (val2.symptoms.includes(val.label)) {
                        setDiagnoseList(diagnoseList => [...diagnoseList, val2.name])
                    }
                    
                })
                setDiagnoseList(diagnoseList => [...removeDuplicates(diagnoseList)])
            });

        }


        fetchDiagnoses();
    }, [(stepCount == 3)])

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
                            Какъв е вашият пол?
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
                {stepCount == 2 && <Card sx={{ maxWidth: 800, height: "auto", textAlign: "center", backgroundImage: "linear-gradient(#00A3FF, #859CA9)" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                            Въведете вашите симптоми?
                        </Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={symptomeHolder}
                            sx={{ width: 300 }}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="Симптоми..." />}
                        />
                    </CardContent>
                    <Button size="small" sx={{ color: "white" }} onClick={handleSubmit}>Добави</Button>
                    <Button size="small" sx={{ color: "white" }} onClick={handleClear}>Изчисти</Button>
                    <List>
                        {symList.map((val) => {
                            return (
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={val.label} />
                                    </ListItemButton>
                                </ListItem>)
                        })}
                    </List>
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        pt={"2em"}>
                        <CardActions>
                            <Button size="small" sx={{ color: "white" }} onClick={() => setStepCount(stepCount - 1)}>{"<"} Назад</Button>
                            <Button size="small" sx={{ color: "white" }} onClick={() => getUnique()}>Напред {">"} </Button>
                        </CardActions>
                    </Grid>
                </Card>}
                {stepCount == 3 && <Card sx={{ maxWidth: 800, height: "auto", textAlign: "center", backgroundImage: "linear-gradient(#00A3FF, #859CA9)" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                            Подредба на възможни диагнози.
                        </Typography>
                    </CardContent>
                    <List>
                        {diagnoseList.map((val) => {
                            return (
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={val} />
                                    </ListItemButton>
                                </ListItem>)
                        })}
                    </List>
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        pt={"2em"}>
                        <CardActions>
                            <Button size="small" sx={{ color: "white" }} onClick={handleClearDiagnose}>{"<"} Назад</Button>
                        </CardActions>
                    </Grid>
                </Card>}
            </Grid>
        </div>
    )
}

const symptomeHolder = [
    { label: 'кихане' },
    { label: 'сухо гърло' },
    { label: 'температура' },
    { label: 'болки в мускулите' },
    { label: 'главоболие' },
    { label: 'отпадналост' },
    { label: 'кашлица' },
    { label: 'напрежение по лицето' },
    { label: 'запушен нос' },
    { label: 'гъст секрет' },
    { label: 'разтройство' },
    { label: 'повдигане' },
    { label: 'болки в корема' },
    { label: 'често уриниране' },
    { label: 'болка при уриниране' },
    { label: 'кръв в урината' },
    { label: 'болки в ушите' },
    { label: 'секрет от ушите' },
    { label: 'загуба на слух' },
    { label: 'сърбеж' },
    { label: 'обриви' },
    { label: 'загуба на апетит' },
    { label: 'повръщане' },
    { label: 'подуване' },
];

export default Diagnose