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

export default function Doctor() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            sx={{mt:"10em"}}
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
                            Lizard
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div">
                            Описание:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div">
                            Спецялност:
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div">
                            Цена:
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href="/consult"><Button size="small">Назад</Button></Link>
                        <Button size="small">Запонете чат</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
