import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="no-movies-container text-center">
        <div className="no-movies-content">
          <h3 className="no-movies-title">🎬 No Movies Found</h3>
          <p className="no-movies-text">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <Row className="g-4 movie-grid">
      {movies.map(movie => (
        <Col key={movie.id} xs={12} sm={6} lg={4} xl={3}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
