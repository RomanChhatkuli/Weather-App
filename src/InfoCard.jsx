import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { getDayOrNight, convertToLocalTime, weatherConditions } from './helper';
import './App.css'

export default function InfoCard({ info }) {
    let time = convertToLocalTime(info.dt, info.timezone)
    let dayOrNight = getDayOrNight(info.dt, info.timezone)

    return (
        <>
            {info &&
                <div className="infoCard">
                    <Card sx={{ maxWidth: 480 }}>
                        {time && (
                            <div>
                                <strong>Local Time:</strong> {time}
                            </div>
                        )}

                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image={info.description && weatherConditions(info.description, dayOrNight) || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3NWGFhaXtTE8-4RFwKYMHk13voLMcLhfZNw&s"}
                                alt={`Weather condition: ${info.description}`}
                            />
                            <CardContent sx={{ backgroundColor: "#eeeeee", marginTop: "-15px" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <div className="cityName">
                                        {info.name}, {info.country}
                                        {info.icon && (
                                            <img
                                                src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`}
                                                alt={info.icon}
                                                height={50}
                                                style={{ filter: 'invert(2) grayscale(1) brightness(5)' }}
                                            />
                                        )}

                                    </div>
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <strong>Temperature:</strong> {info.temp} °C<br />
                                    <strong>Feels like:</strong>  {info.feels_like} °C<br />
                                    <strong>Description:</strong> {info.description} <br />
                                    <strong>Humidity:</strong>    {info.humidity}  %<br />
                                    <strong>Wind Speed:</strong>  {info.wind}  m/s
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            }
        </>
    );
}

