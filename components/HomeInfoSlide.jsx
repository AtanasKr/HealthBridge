"use client";
import { Box, Grid, Typography } from "@mui/material";

const HomeInfoSlide = () => {
    return (
        <Box display="flex"
            justifyContent="center"
            minHeight="5vh"
            sx={{
                paddingTop: { xl: "4em", md: "3em" },
                paddingBottom: { xl: "5em", md: "3em" },
                backgroundColor: "#00A3FF",
                marginTop: { xl: "6em", md: "2em" },
                marginLeft: { xl: "12em", md: "3em" }
            }}>
            <Grid sx={{ paddingRight: { xl: "8em", md: "3em" } }}>
                <img
                    src="/assets/images/Home-Intro.png"
                    alt="Image Title"
                    width="400vw"
                    height="250vh"
                />
            </Grid>
            <Grid sx={{
                paddingLeft: { xl: "7em", md: "1em" },
                paddingTop: { xl: "2em", md: "1em" },
                paddingRight: { xl: "18em" }
            }}>
                <Typography variant="h5" component="h2" paddingBottom="1em" color="white">
                    Health Bridge
                </Typography>
                <Typography variant="body2" component="p" fontSize="17px" color="white">
                Health Bridge е медицински уебсайт,<br/> 
                предоставящ широк спектър от медицински услуги<br/>
                и ресурси, които помагат на потребителите да получат<br/>
                достъп до качествена здравна грижа.<br/>
                Сайтът предлага различни функционалности,<br/>
                включително консултации с лекари, записване на<br/>
                прегледи, самодиагностика и регистрация.
                </Typography>
            </Grid>
        </Box>
    )
}

export default HomeInfoSlide