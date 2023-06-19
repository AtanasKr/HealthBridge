"use client"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingComponent from '@components/LoadingComponent';
import TextField from '@mui/material/TextField';

export default function Profile(ctx) {

    const [userHolder, setUserHolder] = useState(null);
    const [dataToPass, setDataToPass] = useState({
        username: "",
        category: "",
        price: "",
        description: ""
    });

    const handleChange = (event) => {
        setDataToPass(prev => ({ ...prev, [event.target.name]: event.target.value }))

    }
    let userFromDatabase

    async function updateInfo() {
        let id = ctx.params.id
        try {
            console.log(dataToPass);
            debugger;
            const res = await fetch(`http://localhost:3000/api/updateInfo/${ctx.params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    newData: JSON.stringify(dataToPass),
                })
            })

            if (res.ok) {
                const data = await res.json();
                console.log(data);
              } else {
                throw new Error('Failed to update document');
              }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:3000/api/doctor/${ctx.params.id}`)
            userFromDatabase = await res.json();
            setUserHolder(userFromDatabase)

        }

        fetchData();
    }, [])

    if (!userHolder) {
        return <LoadingComponent />
    }
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            sx={{ pt: "5em" }}
        >
            <Grid item xs={3}>
                <Card display="flex" justify="center" sx={{ maxWidth: 600 }}>
                    <CardContent>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Име"
                            name="username"
                            autoFocus
                            defaultValue={userHolder[0].username}
                            sx={{ width: "30em" }}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Описание"
                            name="description"
                            autoFocus
                            defaultValue={userHolder[0].description}
                            sx={{ width: "30em" }}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="category"
                            label="Спецялност"
                            name="category"
                            autoFocus
                            defaultValue={userHolder[0].category}
                            sx={{ width: "30em" }}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Цена"
                            name="price"
                            autoFocus
                            defaultValue={userHolder[0].price}
                            sx={{ width: "30em" }}
                            onChange={handleChange}
                        />
                    </CardContent>
                    <CardActions>
                        <Link href="/"><Button size="small">Назад</Button></Link>
                        <Button size="small" onClick={updateInfo}>Запази</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
