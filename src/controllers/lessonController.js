import Lesson from '../models/lesson.js';

export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res.status(200).json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findOne({ where: { id: lessonId } });
    if (lesson) {
      return res.status(200).json(lesson);
    }
    return res.status(404).json({ message: 'Lesson not found' });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createLesson = async (req, res) => {
  const { subjectId, title, description, content } = req.body;
  if (!subjectId || !title) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newLesson = await Lesson.create({ subjectId, title, description, content });
    res.status(201).json({ message: 'Lesson created', lesson: newLesson });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteLesson = async (req, res) => {
  const lessonId = req.params.id;
  if (!lessonId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Lesson.destroy({ where: { id: lessonId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    return res.status(200).json({ message: 'Lesson deleted' });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateLesson = async (req, res) => {
  const { id, subjectId, title, description, content } = req.body;
  if (!id || !title) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Lesson.update(
      { subjectId, title, description, content },
      { where: { id } }
    );
    if (updated) {
      const updatedLesson = await Lesson.findOne({ where: { id } });
      return res.status(200).json({ message: 'Lesson updated', lesson: updatedLesson });
    }
    return res.status(404).json({ message: 'Lesson not found' });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
