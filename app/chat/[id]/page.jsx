"use client"
import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoadingComponent from "@components/LoadingComponent";
import { useSession } from 'next-auth/react';


let messages = null;
const Chat = (ctx) => {
    const [doctorHolder, setDoctorHolder] = useState(null);
    const [messages, setMessages] = useState([]);
    let doctor

    const { data: session } = useSession();
    let username = null
    if (session) {
        username = session.user.username;
    }

    async function getMessages() {

        const resMessages = await fetch("http://localhost:3000/api/getChats")
        const getMessages = await resMessages.json();
        debugger;
        if (getMessages.length > 0) {
            setMessages(getMessages);
        }
        debugger;
    }

    useEffect(() => {
        async function getDoctorInfo() {

            const res = await fetch(`http://localhost:3000/api/doctor/${ctx.params.id}`)
            doctor = await res.json();
            setDoctorHolder(doctor)
        }

        getDoctorInfo();
    }, [doctor])

    useEffect(() => {

        getMessages();
    }, [])

    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (input.trim() !== "") {
            setInput(input);
            try {
                const idTo = ctx.params.id;
                const idFrom = session.user._id;
                const nameTo = doctorHolder[0].username;
                const nameFrom = session.user.username;
                const message = input;
                const res = await fetch(`http://localhost:3000/api/chat`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.user?.accessToken}`
                    }, method: 'POST',
                    body: JSON.stringify({ idFrom, idTo, nameFrom, nameTo, message })
                });


                if (!res.ok) {
                    throw new Error("Error occured")
                }

            } catch (error) {
                console.log(error)
            }
            setInput("");
            getMessages()
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    if (!messages) {
        return <LoadingComponent />
    }
    return (
        <>
            <Box
                sx={{
                    height: "92vh",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "grey.200",
                }}
            >
                <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                    {messages?.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                </Box>
                <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Въведете съобщение..."
                                variant="outlined"
                                value={input}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={handleSend}
                            >
                                Изпрати
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Button
                fullWidth
                color="primary"
                variant="contained"
                href="/"
            >
                обратно в начало
            </Button>
        </>
    );
};

const Message = ({ message }) => {
    const { data: session } = useSession();
    const isCurrUser = session?.user?._id !== message.idFrom;
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: isCurrUser ? "flex-start" : "flex-end",
                    mb: 2,
                }}
            >
                <Typography sx={{
                    ml: isCurrUser ? 1 : 0,
                    mr: isCurrUser ? 0 : 1,
                }}>{message.nameFrom}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: isCurrUser ? "flex-start" : "flex-end",
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isCurrUser ? "row" : "row-reverse",
                        alignItems: "center",
                    }}
                >
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            ml: isCurrUser ? 1 : 0,
                            mr: isCurrUser ? 0 : 1,
                            backgroundColor: isCurrUser ? "primary.light" : "secondary.light",
                            borderRadius: isCurrUser ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                        }}
                    >
                        <Typography variant="body1">{message.message}</Typography>
                    </Paper>
                </Box>
            </Box>
        </>
    );
};

export default Chat;