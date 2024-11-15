import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import "./App.css"
import SearchIcon from './search.svg'


// https://omdbapi.com/apikey.aspx api 키생성
const API_URL = 'http://www.omdbapi.com?apikey=e1bfa07a';

const movie1 = {
    "Title": 'Italian Spiderman', 
    "Year": '2007', 
    "imdbID": 'tt2705436',
    "Type": 'movie', 
    // "Poster": 'https://m.media-amazon.com/images/M/MV5BYWNiMmNlNm…TgxM2QtNDY3ZGQxNDMwZDgzXkEyXkFqcGc@._V1_SX300.jpg'}
    "Poster": "N/A"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const serachMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        serachMovies('Spiderman');
    },[]);

    return (
       <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => serachMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie = {movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }  
       </div>
    );
}

export default App;