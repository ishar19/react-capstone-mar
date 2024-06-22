import { useEffect, useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Info() {
    const [weather, setWeather] = useState(null);
    const [notes, saveNotes] = useState(localStorage.getItem('notes') || '');
    const [news, setNews] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const updateNotes = (e) => {
        saveNotes(e.target.value);
        localStorage.setItem('notes', JSON.stringify(e.target.value));
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    const selectedMovies = JSON.parse(localStorage.getItem('selectedMovies'));
    useEffect(() => {
        fetch('https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json')
            .then(response => response.json())
            .then(data => setNews(data.articles[Math.floor(Math.random() * data.articles.length | 1)]))
    }, [])
    useEffect(() => {
        fetch('https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=O6hIIKUOhewW3VNl4A3fPj2skP32Ws3c')
            .then(response => response.json())
            .then(data => setWeather(data.timelines['daily'][0]['values']))
    }, [])
    const date = Date.now();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const seconds = new Date(date).getSeconds();
    useEffect(() => {
        const interval = setInterval(() => {
            setToggle(!toggle);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])
    const handleTimer = (operation, value) => {
        if (operation === 1) {
            setTime((time) => time + value);
        } else {
            setTime((time) => {
                if (time - value < 0) {
                    return 0;
                }
                return time - value;

            });
        }
    }
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours}:${minutes}:${seconds}`;
    }
    return (

        <div>
            <div style={{
                display: 'flex',
                color: 'white',
                flexDirection: 'column',
                height: '30vh',
                backgroundColor: '#5746EA',
                padding: '10px',

            }}  >
                {userData ? <>
                    <p>{userData.name}</p>
                    <p>{userData.email}</p>
                    <p>{userData.username} </p>
                </> : 'No user data'}

                {selectedMovies ? <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}>
                    {selectedMovies.map((movie, index) => <p key={index}>{movie.movie} </p>)}
                </div> : 'No selected movies'}
            </div>
            <textarea style={{
                maxHeight: "400px",
                minHeight: "400px",
                minWidth: "40%",
                maxWidth: "40%",
                padding: "10px",
                background: "#F1C75B",
                borderRadius: "10px",
                marginTop: "20px",
            }} value={notes} onChange={updateNotes}>
            </textarea>
            {news ? <div>
                <img src={news.urlToImage} width={300} height={300} alt={news.title} />
                <p>{news.title}</p>
                <p>{news.description}</p>
                <p>{news?.content?.split('[')[0]}</p>

            </div> : "No news"}
            {weather ? <div style={{
                display: 'flex',
                color: 'white',
                flexDirection: 'column',
                height: '50vh',
                backgroundColor: '#5746EA',
                padding: '10px',
            }}>
                <p> Date : {day}/{month}/{year}</p>
                <p> Time : {hours}:{minutes}:{seconds}</p>
                <p> Temperature : {weather.temperatureAvg}</p>
                <p>Pressure {weather.pressureSurfaceLevelAvg} </p>
                <p> WindSpeed {weather.windSpeedAvg}</p>
                <p> Humidity {weather.humidityAvg}</p>
            </div> : "No weather"}
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={time}
                colors={['#004777']}
            >
                {({ remainingTime }) => formatTime(remainingTime)}
            </CountdownCircleTimer>
            <button onClick={() => setIsPlaying(true)}>Start</button>
            <button onClick={() => handleTimer(1, 3600)}>+1 Hour</button>
            <button onClick={() => handleTimer(1, 60)}>+1 Minute</button>
            <button onClick={() => handleTimer(1, 1)}>+1 Second</button>
            <button onClick={() => handleTimer(0, 3600)}>-1 Hour</button>
            <button onClick={() => handleTimer(0, 60)}>-1 Minute</button>
            <button onClick={() => handleTimer(0, 1)}>-1 Second</button>
        </div>
    )
}