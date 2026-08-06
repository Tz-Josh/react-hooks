import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovieForm from './components/AddMovieForm';
import moviesData from './moviesData';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Initialize movies with data
  useEffect(() => {
    setMovies(moviesData);
    setFilteredMovies(moviesData);
  }, []);

  // Filter movies whenever filters or movies change
  useEffect(() => {
    let filtered = movies;

    // Filter by title
    if (titleFilter.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(titleFilter.toLowerCase().trim())
      );
    }

    // Filter by rating
    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(movie => movie.rating >= minRating);
    }

    setFilteredMovies(filtered);
  }, [movies, titleFilter, ratingFilter]);

  // Add new movie
  const handleAddMovie = (newMovie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="App">
      <Container fluid className="app-container">
        {/* Header */}
        <Row className="header-row">
          <Col>
            <div className="header-content">
              <h1 className="app-title">🎬 Movie App</h1>
              <p className="app-subtitle">Discover and explore your favorite movies</p>
              <AddMovieForm onAddMovie={handleAddMovie} />
            </div>
          </Col>
        </Row>

        {/* Filter Section */}
        <Row>
          <Col>
            <Filter
              titleFilter={titleFilter}
              setTitleFilter={setTitleFilter}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
            />
          </Col>
        </Row>

        {/* Movie Grid */}
        <Row>
          <Col>
            <div className="movie-count">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
            </div>
            <MovieList movies={filteredMovies} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
