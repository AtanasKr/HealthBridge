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

const DoctorList = ({ props }) => {
    return (
        <Paper sx={{maxHeight: { xl: "30em", md: "23em" }, overflow: 'auto', mr:"3em", boxShadow:"none", mt:"1em"}}>
            <List sx={{ width: 'auto', bgcolor: 'background.paper', pr: "1em"}}>
                <ListItem alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb:"0.5em"}}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Doctor's name"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Doctor spec
                                </Typography>
                                {" — Short desc......"}
                            </React.Fragment>
                        }
                    />
                    <ListItemText
                        primary="Рейтинг 4.0/5.0"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Цена: 5.00лв
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ArrowForwardIosIcon sx={{ mt: "0.6em" }} />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb:"0.5em" }}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Doctor's name"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Doctor spec
                                </Typography>
                                {" — Short desc......"}
                            </React.Fragment>
                        }
                    />
                    <ListItemText
                        primary="Рейтинг 4.0/5.0"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Цена: 5.00лв
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ArrowForwardIosIcon sx={{ mt: "0.6em" }} />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb:"0.5em" }}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Doctor's name"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Doctor spec
                                </Typography>
                                {" — Short desc......"}
                            </React.Fragment>
                        }
                    />
                    <ListItemText
                        primary="Рейтинг 4.0/5.0"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Цена: 5.00лв
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ArrowForwardIosIcon sx={{ mt: "0.6em" }} />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb:"0.5em" }}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Doctor's name"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Doctor spec
                                </Typography>
                                {" — Short desc......"}
                            </React.Fragment>
                        }
                    />
                    <ListItemText
                        primary="Рейтинг 4.0/5.0"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Цена: 5.00лв
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ArrowForwardIosIcon sx={{ mt: "0.6em" }} />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb:"0.5em" }}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Doctor's name"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Doctor spec
                                </Typography>
                                {" — Short desc......"}
                            </React.Fragment>
                        }
                    />
                    <ListItemText
                        primary="Рейтинг 4.0/5.0"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Цена: 5.00лв
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ArrowForwardIosIcon sx={{ mt: "0.6em" }} />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ border: "solid", borderColor: "#00A3FF", borderRadius: "20px", mb:"0.5em" }}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Doctor's name"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Doctor spec
                                </Typography>
                                {" — Short desc......"}
                            </React.Fragment>
                        }
                    />
                    <ListItemText
                        primary="Рейтинг 4.0/5.0"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Цена: 5.00лв
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ArrowForwardIosIcon sx={{ mt: "0.6em" }} />
                </ListItem>
            </List>
        </Paper>
    )
}

export default DoctorList