import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import './AddMovieForm.css';

const AddMovieForm = ({ onAddMovie }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: ''
  });
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setFormData({ title: '', description: '', posterURL: '', rating: '' });
    setErrors({});
  };

  const handleShow = () => setShow(true);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.posterURL.trim()) newErrors.posterURL = 'Poster URL is required';
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newMovie = {
      id: Date.now(), // Simple unique ID
      title: formData.title.trim(),
      description: formData.description.trim(),
      posterURL: formData.posterURL.trim(),
      rating: parseFloat(formData.rating)
    };

    onAddMovie(newMovie);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <button className="add-movie-btn" onClick={handleShow}>
        <FaPlus /> Add New Movie
      </button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">
            <FaPlus className="modal-icon" /> Add New Movie
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">Movie Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter movie title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? 'is-invalid' : ''}
              />
              {errors.title && (
                <Form.Text className="text-danger">{errors.title}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter movie description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'is-invalid' : ''}
              />
              {errors.description && (
                <Form.Text className="text-danger">{errors.description}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">Poster URL *</Form.Label>
              <Form.Control
                type="url"
                name="posterURL"
                placeholder="Enter poster image URL"
                value={formData.posterURL}
                onChange={handleChange}
                className={errors.posterURL ? 'is-invalid' : ''}
              />
              {errors.posterURL && (
                <Form.Text className="text-danger">{errors.posterURL}</Form.Text>
              )}
              {formData.posterURL && !errors.posterURL && (
                <div className="preview-container mt-2">
                  <small className="text-muted">Preview:</small>
                  <img 
                    src={formData.posterURL} 
                    alt="Preview" 
                    className="preview-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label-custom">Rating * (0-5)</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                placeholder="Enter rating (0-5)"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
                className={errors.rating ? 'is-invalid' : ''}
              />
              {errors.rating && (
                <Form.Text className="text-danger">{errors.rating}</Form.Text>
              )}
            </Form.Group>

            <div className="modal-actions">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="submit-btn">
                Add Movie
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMovieForm;
