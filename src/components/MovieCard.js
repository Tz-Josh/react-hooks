import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }
    return stars;
  };

  return (
    <Card className="movie-card">
      <div className="card-image-wrapper">
        <Card.Img 
          variant="top" 
          src={movie.posterURL} 
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Image+Available';
          }}
        />
        <div className="rating-badge">
          <Badge bg="warning" className="rating-badge-text">
            <FaStar className="rating-star" /> {movie.rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      
      <Card.Body className="movie-card-body">
        <Card.Title className="movie-title">{movie.title}</Card.Title>
        <Card.Text className="movie-description">
          {movie.description.length > 120 
            ? `${movie.description.substring(0, 120)}...` 
            : movie.description}
        </Card.Text>
        <div className="star-rating">
          {renderStars(movie.rating)}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
