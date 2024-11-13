import Course  from '../models/course.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findOne({ where: { id: courseId } });
    if (course) {
      return res.status(200).json(course);
    }
    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createCourse = async (req, res) => {
  const { title, description, teacherId } = req.body;
  if (!title || !description || !teacherId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newCourse = await Course.create({ title, description, teacherId });
    res.status(201).json({ message: 'Course created', course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  if (!courseId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Course.destroy({ where: { id: courseId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateCourse = async (req, res) => {
  const { id, title, description, teacherId } = req.body;
  if (!id || !title || !description) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Course.update(
      { title, description, teacherId },
      { where: { id } }
    );
    if (updated) {
      const updatedCourse = await Course.findOne({ where: { id } });
      return res.status(200).json({ message: 'Course updated', course: updatedCourse });
    }
    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
