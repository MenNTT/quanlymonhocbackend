import Grade from '../models/grade.js';

export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll();
    res.status(200).json(grades);
  } catch (error) {
    console.error('Error fetching grades:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getGrade = async (req, res) => {
  try {
    const gradeId = req.params.id;
    const grade = await Grade.findOne({ where: { id: gradeId } });
    if (grade) {
      return res.status(200).json(grade);
    }
    return res.status(404).json({ message: 'Grade not found' });
  } catch (error) {
    console.error('Error fetching grade:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createGrade = async (req, res) => {
  const { studentId, courseId, score } = req.body;
  if (!studentId || !courseId || score === undefined) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newGrade = await Grade.create({ studentId, courseId, score });
    res.status(201).json({ message: 'Grade created', grade: newGrade });
  } catch (error) {
    console.error('Error creating grade:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteGrade = async (req, res) => {
  const gradeId = req.params.id;
  if (!gradeId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Grade.destroy({ where: { id: gradeId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    return res.status(200).json({ message: 'Grade deleted' });
  } catch (error) {
    console.error('Error deleting grade:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateGrade = async (req, res) => {
  const { id, score } = req.body;
  if (!id || score === undefined) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Grade.update(
      { score },
      { where: { id } }
    );
    if (updated) {
      const updatedGrade = await Grade.findOne({ where: { id } });
      return res.status(200).json({ message: 'Grade updated', grade: updatedGrade });
    }
    return res.status(404).json({ message: 'Grade not found' });
  } catch (error) {
    console.error('Error updating grade:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
