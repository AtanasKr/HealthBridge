"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingComponent from '@components/LoadingComponent';

export default function Doctor(ctx) {

    const [doctorHolder, setDoctorHolder] = useState(null);
    let doctor

    useEffect(() => {
        async function fetchDoctor() {

            const res = await fetch(`http://localhost:3000/api/doctor/${ctx.params.id}`)
            doctor = await res.json();
            setDoctorHolder(doctor)

        }

        fetchDoctor();
    }, [])

    if (!doctorHolder) {
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
            sx={{ mt: "10em" }}
        >
            <Grid item xs={3}>
                <Card display="flex" justify="center" sx={{ maxWidth: 600 }}>
                    {/* <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    /> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {doctorHolder[0].username}
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div">
                            Описание:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {doctorHolder[0].description}
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div">
                            Спецялност: {doctorHolder[0].category}
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div">
                            Цена: {doctorHolder[0].price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href="/consult"><Button size="small">Назад</Button></Link>
                        <Button size="small">Запонете чат</Button>
                        <Button size="small">Запазете дата за преглед</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
