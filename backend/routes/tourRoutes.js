const express = require('express');
const router = express.Router();
const { 
  getTours, 
  getTourBySlug, 
  createTour, 
  updateTour, 
  deleteTour 
} = require('../controllers/tourController');

// Get All Tours
router.get('/', getTours);

// Get Single Tour by Slug OR ID
router.get('/:slug', getTourBySlug);

// Create New Tour Package
router.post('/', createTour);

// Edit / Update Tour Route
router.put('/:id', updateTour);

// Delete Tour
router.delete('/:id', deleteTour);

module.exports = router;