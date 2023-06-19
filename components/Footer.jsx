"use client"
import { Paper, Typography, Icon } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Paper sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: {xl:80, md: 60},
            backgroundColor: '#00A3FF',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            color:"white",
        }} square>
            <Typography variant="body1">@Health Bridge {new Date().getFullYear()}</Typography>
            <Icon sx={{margin: '0 8px'}}>
                <InstagramIcon />
            </Icon>
            <Icon sx={{margin: '0 8px'}}>
                <FacebookIcon />
            </Icon>
            <Icon sx={{margin: '0 8px'}}>
                <GitHubIcon />
            </Icon>
        </Paper>
    );
};

export default Footer;
