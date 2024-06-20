import { useEffect, useState } from "react";
export default function Browse() {
    const [genreList, setGenreList] = useState([]);
    const [movies, setMovies] = useState(null);
    useEffect(() => {
        const fetchGenres = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmE0MTU2ZmQ2MTQ3NWEyZDNiZDdkNThkNjMwMWRkOSIsInN1YiI6IjY0MDhmMmQ1MDNmMGI2MDBlOWIwMGU5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fynkjlrA3ndCcSC-gukTQs78CTQtKFqpFgrzHnSXQTw'
                }
            };

            const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            const data = await res.json();
            setGenreList(data.genres);

        }
        fetchGenres();
    }, [])


    useEffect(() => {
        if (genreList.length > 0) {
            let genresToBeFetched = [];
            userSelectedGenres.forEach((genre) => {
                genresToBeFetched.push(genreList.find((item) => item.name === genre.movie))
            })
            const fetchMovies = async () => {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmE0MTU2ZmQ2MTQ3NWEyZDNiZDdkNThkNjMwMWRkOSIsInN1YiI6IjY0MDhmMmQ1MDNmMGI2MDBlOWIwMGU5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fynkjlrA3ndCcSC-gukTQs78CTQtKFqpFgrzHnSXQTw'
                    }
                };
                const idArray = genresToBeFetched.map((item) => item.id);
                idArray.join('%2C');
                const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${idArray}`, options)
                const data = await res.json();
                setMovies(data.results);
            }
            fetchMovies();
        }
    }, [genreList])

    const userSelectedGenres = JSON.parse(localStorage.getItem("selectedMovies"));

    return (
        <div>
            <h1>Browse</h1>
            {movies === null ? "laoding..." :
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",

                }}>
                    {movies.map((movie, idx) => {
                        if (idx >= 4 * userSelectedGenres.length) return null;
                        return <>
                            {idx % 4 === 0 ? <div style={{
                                backgroundColor: "lightblue",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "10px",
                                gridColumn: "span 4",

                            }}>{userSelectedGenres[idx / 4].movie}</div> : null}
                            <div key={movie.id} style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <img height={100} width={100} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                {movie.title}</div>
                        </>
                    })}
                </div>

            }
        </div>
    )
}