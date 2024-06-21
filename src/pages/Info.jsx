import { useEffect, useState } from "react";
export default function Info() {
    const [notes, saveNotes] = useState(localStorage.getItem('notes') || '');
    const [news, setNews] = useState(null);
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
                <p>{news.content.split('[')[0]}</p>

            </div> : "No news"}

        </div>
    )
}