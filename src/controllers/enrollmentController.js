import Enrollment  from '../models/enrollment.js';

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.status(200).json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findOne({ where: { id: enrollmentId } });
    if (enrollment) {
      return res.status(200).json(enrollment);
    }
    return res.status(404).json({ message: 'Enrollment not found' });
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createEnrollment = async (req, res) => {
  const { accountId, courseId } = req.body;
  if (!accountId || !courseId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const newEnrollment = await Enrollment.create({ accountId, courseId });
    res.status(201).json({ message: 'Enrollment created', enrollment: newEnrollment });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteEnrollment = async (req, res) => {
  const enrollmentId = req.params.id;
  if (!enrollmentId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const result = await Enrollment.destroy({ where: { id: enrollmentId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    return res.status(200).json({ message: 'Enrollment deleted' });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateEnrollment = async (req, res) => {
  const { id, accountId, courseId, status, grade } = req.body;
  if (!id || !accountId || !courseId) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const [updated] = await Enrollment.update(
      { accountId, courseId, status, grade },
      { where: { id } }
    );
    if (updated) {
      const updatedEnrollment = await Enrollment.findOne({ where: { id } });
      return res.status(200).json({ message: 'Enrollment updated', enrollment: updatedEnrollment });
    }
    return res.status(404).json({ message: 'Enrollment not found' });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
