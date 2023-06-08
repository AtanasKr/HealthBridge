import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Paper } from '@mui/material';
import { useEffect } from 'react'
import Link from 'next/link';

const DoctorList = (props) => {
    const [doctorsDetails, setDoctorDetails] = React.useState(null);
    useEffect(() => {
        async function fetchDoctors() {
            const res = await fetch(`http://localhost:3000/api/consult`)
            const doctors = await res.json();
            setDoctorDetails(doctors);
        }

        fetchDoctors();
    }, [])

    return (
        <Paper sx={{ maxHeight: { xl: "30em", md: "23em" }, overflow: 'auto', mr: "3em", boxShadow: "none", mt: "1em" }}>
            <List sx={{ width: 'auto', bgcolor: 'background.paper', pr: "1em" }}>
                {doctorsDetails?.filter((val) => {
                    if (!props?.searchWord?.label && props?.selectedButton == "all") {
                        return val;
                    } else if ((val.username.toLowerCase().includes(props?.searchWord?.label.toLowerCase()) && val.category.toLowerCase().includes(props?.selectedButton.toLowerCase()))
                        || val.category.toLowerCase().includes(props?.selectedButton.toLowerCase())
                        || (val.username.toLowerCase().includes(props?.searchWord?.label.toLowerCase()) && props?.selectedButton == "all")) {
                        return val;
                    }
                }).map((val) => {
                    return (
                        <Link href={`/doctor/${val._id}`}><ListItem key={val._id} alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb: "0.5em" }}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={val.username}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {val.category}
                                        </Typography>
                                        {" — Short desc......"}
                                    </React.Fragment>
                                }
                            />
                            <ListItemText sx={{ position: "absolute", pl: "30em" }}
                                primary="Цена за консултация"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {val.price} лв
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <ArrowForwardIosIcon sx={{ mt: "0.6em" }} />
                        </ListItem></Link>
                    )
                })}
            </List>
        </Paper>
    )
}

export default DoctorList