import Rating from '../models/rating.js';

export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getRating = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const rating = await Rating.findOne({ where: { id: ratingId } });
    if (rating) {
      return res.status(200).json(rating);
    }
    return res.status(404).json({ message: 'Rating not found' });
  } catch (error) {
    console.error('Error fetching rating:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createRating = async (req, res) => {
  const { userId, itemId, score } = req.body;
  if (!userId || !itemId || score === undefined) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newRating = await Rating.create({ userId, itemId, score });
    res.status(201).json({ message: 'Rating created', rating: newRating });
  } catch (error) {
    console.error('Error creating rating:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteRating = async (req, res) => {
  const ratingId = req.params.id;
  if (!ratingId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Rating.destroy({ where: { id: ratingId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    return res.status(200).json({ message: 'Rating deleted' });
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateRating = async (req, res) => {
  const { id, score } = req.body;
  if (!id || score === undefined) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Rating.update(
      { score },
      { where: { id } }
    );
    if (updated) {
      const updatedRating = await Rating.findOne({ where: { id } });
      return res.status(200).json({ message: 'Rating updated', rating: updatedRating });
    }
    return res.status(404).json({ message: 'Rating not found' });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
