import React, { useEffect, useState } from 'react'

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = `http://www.omdbapi.com/?apikey=9ba80d1b`

const App = () => {
	const [movies, setMovies] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`)
		const data = await response.json();

		setMovies(data.Search);
	}

	useEffect(() => {
		searchMovies('spiderman')
	}, [])

	return (
		<div className='app'>
			<h1 id="apptitle">Movie-Fetch</h1>
			<div className="search">
				<input
					placeholder='Search for movies'
					value={searchTerm}
					onChange={(e) => {setSearchTerm(e.target.value)}}
				/>
				<img
					src={SearchIcon}
					alt="search"
					onClick={() => {searchMovies(searchTerm)}}
				/>
			</div>
			{
				movies?.length > 0
					? (
						<div className="container">
							{movies.map((movie) => (
								<MovieCard movie={movie}/>
							))}
						</div>
					) : (
						<div className="empty">
							<h2> No Movies Found </h2>
						</div>
					)
			}

		</div>
	)
}

export default App