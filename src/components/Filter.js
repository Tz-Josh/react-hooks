import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaStar, FaTimes } from 'react-icons/fa';
import './Filter.css';

const Filter = ({ titleFilter, setTitleFilter, ratingFilter, setRatingFilter }) => {
  const handleClearFilters = () => {
    setTitleFilter('');
    setRatingFilter('');
  };

  return (
    <div className="filter-container">
      <Row className="g-3 align-items-end">
        <Col md={5}>
          <Form.Group>
            <Form.Label className="filter-label">
              <FaSearch className="filter-icon" /> Search by Title
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter movie title..."
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                className="filter-input"
              />
              {titleFilter && (
                <InputGroup.Text 
                  className="clear-btn"
                  onClick={() => setTitleFilter('')}
                  style={{ cursor: 'pointer' }}
                >
                  <FaTimes />
                </InputGroup.Text>
              )}
            </InputGroup>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label className="filter-label">
              <FaStar className="filter-icon" /> Minimum Rating
            </Form.Label>
            <Form.Select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Ratings</option>
              <option value="1">⭐ 1+ Stars</option>
              <option value="2">⭐⭐ 2+ Stars</option>
              <option value="3">⭐⭐⭐ 3+ Stars</option>
              <option value="4">⭐⭐⭐⭐ 4+ Stars</option>
              <option value="4.5">⭐⭐⭐⭐⭐ 4.5+ Stars</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={3}>
          {(titleFilter || ratingFilter) && (
            <button 
              className="clear-filters-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}
        </Col>
      </Row>
      
      {/* Active filters display */}
      {(titleFilter || ratingFilter) && (
        <div className="active-filters mt-3">
          <span className="active-filters-label">Active Filters:</span>
          {titleFilter && (
            <span className="filter-tag">
              Title: "{titleFilter}"
              <FaTimes 
                className="filter-tag-remove"
                onClick={() => setTitleFilter('')}
              />
            </span>
          )}
          {ratingFilter && (
            <span className="filter-tag">
              Rating: {ratingFilter}+ Stars
              <FaTimes 
                className="filter-tag-remove"
                onClick={() => setRatingFilter('')}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
