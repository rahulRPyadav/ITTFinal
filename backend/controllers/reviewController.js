const Review = require('../models/Review');

// Sabhi reviews fetch karne ke liye (Newest first)
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('tour', 'title location')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Naya review save karne ke liye
exports.createReview = async (req, res) => {
  try {
    const { userName, rating, comment, tourId } = req.body;

    if (!userName || !comment) {
      return res.status(400).json({ success: false, message: 'Name and comment are required.' });
    }

    const review = await Review.create({
      userName,
      rating: Number(rating) || 5,
      comment,
      tour: tourId || null,
      user: req.user ? req.user.id : null
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};