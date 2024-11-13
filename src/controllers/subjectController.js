import Subject from '../models/subject.js';

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const subject = await Subject.findOne({ where: { id: subjectId } });
    if (subject) {
      return res.status(200).json(subject);
    }
    return res.status(404).json({ message: 'Subject not found' });
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createSubject = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newSubject = await Subject.create({ title, description });
    res.status(201).json({ message: 'Subject created', subject: newSubject });
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteSubject = async (req, res) => {
  const subjectId = req.params.id;
  if (!subjectId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Subject.destroy({ where: { id: subjectId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    return res.status(200).json({ message: 'Subject deleted' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateSubject = async (req, res) => {
  const { id, title, description } = req.body;
  if (!id || !title) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Subject.update(
      { title, description },
      { where: { id } }
    );
    if (updated) {
      const updatedSubject = await Subject.findOne({ where: { id } });
      return res.status(200).json({ message: 'Subject updated', subject: updatedSubject });
    }
    return res.status(404).json({ message: 'Subject not found' });
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
